import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./forum.css";
import { fetchDataGrupChat,postNewDataGrupChat,updateNewGrupChat } from "./forumSlice";
import { openMessenger } from "../messenger/messengerSlice";

export default function GrupChat({newSocket}){
    const dataChats = useSelector((state)=> state.forum.data.groupChat)
    const nameUser = useSelector((state)=> state.user.data.data.name)
    const loading = useSelector((state)=> state.forum.loading)
    const [newChat,setNewChat] = useState('')
    const [imgSend,setImgSend] = useState(null)
    const dispatch = useDispatch()
    const divRef = useRef(null);
    
    useEffect(() => {  
      newSocket.on("grupChat",(data)=>{
          dispatch(updateNewGrupChat(data))   
      }) 
    },[]);

    useEffect(()=>{
        dispatch(fetchDataGrupChat());   
    },[]);

    useEffect(() => {
        // Cuộn đến phần tử cuối cùng của thẻ div khi thêm dữ liệu mới
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }, [dataChats]);
    
    function setImg(event){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = ()=>{   
            setImgSend(reader.result);   
        }
    }   

    function sendChat(){
        if(imgSend){
            dispatch(postNewDataGrupChat({name:nameUser,messenger:newChat,img:imgSend}))
        }else{
            dispatch(postNewDataGrupChat({name:nameUser,messenger:newChat,img:null}))
        }  
        setImgSend(null)
        setNewChat('')
    };
    
  
    function handleKeyPress(event) {
        if (event.key === "Enter") {
          sendChat();
        }
    };
 
    const ContentChat = dataChats.map(function(datachat,index){

        const date = new Date(datachat.dateChat);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hour = ('0' + (date.getHours() )).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const second = ('0' + date.getSeconds()).slice(-2);
        const formattedTime = `At ${day}/${month} ${hour}:${minute}:${second}`;
        
        function fetchMessenger(){
            dispatch(openMessenger(datachat.name))
        }

        if(datachat.name === nameUser){
            
            return(
            <div className="myChat" key={index}>
                <div className="chatName">
                    <div className="chatDate">{formattedTime}</div>
                </div>
                {datachat.messenger &&<div className="chatMesenger">{ datachat.messenger}</div>}
                
                <img className="imgChat" src={datachat.img}></img>
                
            </div>
            )
        }else{

            return(
                <div className="chat" key={index}>
                    <div className="chatName">
                        <div className="avt"><i className="fa-solid fa-circle-user"></i></div>
                        <div className="nameZ">{datachat.name}</div>
                        <div className="chatDate">{formattedTime}</div>
                        <div className="dost"><i onClick={fetchMessenger} className="fa-regular fa-comment-dots"></i></div>
                    </div>
                    {/* <div className="chatMesenger">{datachat.messenger}</div> */}
                    {datachat.messenger &&<div className="chatMesenger">{ datachat.messenger}</div>}
                    <img className="imgChat" src={datachat.img}></img>
                    
                </div>
            )
            
        }
        
    });

    
    return(
        
            <div className="groupChat">

                <div className="title">
                    <span> Group Chat </span> 
                </div>
                
                <div ref={divRef} className="contentGroupChat">{!loading ? ContentChat :<div className="loading">loading......</div>}</div>
                
                <div className="send">
                
                <label class="custom-file-upload">
                    <input className="inputFile"  type="file" onChange={setImg} ></input>
                    {imgSend &&<span>1</span>}
                    
                    <i className="fa-regular fa-image"></i>
                </label>

                <div className="send-1">
                    <input className="inputText" type='text' value={newChat} onChange={(e)=>{setNewChat(e.target.value)}} onKeyPress={handleKeyPress}  ></input>
                </div>

                <button  className="sendButton" onClick={sendChat}  >send</button>

                </div>
            </div>
            
       
    )
}