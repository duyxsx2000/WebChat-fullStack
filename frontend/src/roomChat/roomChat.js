import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../forum/forum.css";
import {postRoomChat,setDisplay,upNewChatInRoom, upNewMemberList } from "../forum/forumSlice";
import socketIOClient from 'socket.io-client'
import PersonalChat from "../forum/personalChat";
import AddMemberRoomChat from "./addMemberRoomChat";
import "./roomChat.css"


export default function RoomChat({newSocket}){
    const dataRoom = useSelector((state)=> state.forum.data.display)
    const nameUser = useSelector((state)=> state.user.data.data.name)
    const dataRoomChange = useSelector((state)=> state.forum.data.display.nameRoom)
   
    const [newChat,setNewChat] = useState('')
    const [imgSend,setImgSend] = useState(null)
    const [lastPong,setLastPong] = useState(null)
    const dispatch = useDispatch()
    const divRef = useRef(null);
    const nameRoom = dataRoom.nameRoom;
    const [oppenAddMember,setOppenAddMember] = useState(false)

    useEffect(()=>{
        newSocket.on("roomChat",(data)=>{
            console.log(dataRoom);
            console.log(data.content[0])
            if(data.listMember && 
                data.listMember.includes(nameUser) && 
                data.nameRoom === nameRoom &&
                data.content[0].name
                ){
               dispatch(upNewChatInRoom(data.content[0]))
               ;

            };

            if(data && 
                data.listMember && 
                data.listMember.includes(nameUser) &&  
                
                !data.content[0].name
                ){
                dispatch(upNewMemberList({listMember:data.listMember,nameRoom:data.nameRoom}))
              
            }
            
        })
      
    },[dataRoomChange])
    useEffect(() => {
        // Cuộn đến phần tử cuối cùng của thẻ div khi thêm dữ liệu mới
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }, [dataRoom]);

    function sendChat(){
        dispatch(postRoomChat({nameRoomChat:nameRoom,messenger:newChat,name:nameUser,newData:true}))
        
    };
    function setImg(event){
    
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = ()=>{   
            setImgSend(reader.result);   
        }
    }   
    function sendChat(){

        if(imgSend){
            console.log(imgSend);
            console.log(newChat);
            dispatch(postRoomChat({nameRoomChat:nameRoom,messenger:newChat,name:nameUser,newData:true,img:imgSend}))
           
        }else{
            dispatch(postRoomChat({nameRoomChat:nameRoom,messenger:newChat,name:nameUser,newData:true,img:null}))
 
        }
        
        
    };
    
    function handleKeyPress(event) {
        if (event.key === "Enter") {
          sendChat();
        }
      }
   
    const ContentChat = dataRoom.content.map(function(datachat,index){
        
        const date = new Date(datachat.dateChat);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hour = ('0' + (date.getHours() )).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const second = ('0' + date.getSeconds()).slice(-2);
        const formattedTime = `At ${day}/${month} ${hour}:${minute}:${second}`;
        
        if(datachat.name === nameUser){
            console.log(datachat.messenger); 
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
                    </div>
                    <div className="chatMesenger">{datachat.messenger}</div>
                    <img className="imgChat" src={datachat.img}></img>
                    
                </div>
            )
            
        }
        
    })
    function outRoom(){
        dispatch(setDisplay('out')) 
    }
    return(
        
            <div className="roomChat">
                <div className="title">
                    <span><i className="fa-solid fa-reply" onClick={outRoom}></i></span>
                    <span className="nameRoom">{nameRoom}</span>

                    <span className="member">
                         Member: {dataRoom.listMember.length} 
                         <button onClick={()=>{!oppenAddMember ? setOppenAddMember(true): setOppenAddMember(false) }}><i className="fa-solid fa-plus"></i> Add Member  </button>
                        
                    </span>
                    
                </div>
                <div ref={divRef} className="contentRoomChat">{ContentChat}</div>
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

               {oppenAddMember&&<AddMemberRoomChat></AddMemberRoomChat>}  
            </div>
            
       
    )
}