
import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMessenger,cloneMessenger,updateMessenger } from "./messengerSlice";

import './mess.css'


export default function  ContenMessenger({newSocket}){
    
  const dataMessenger = useSelector((state)=>state.messenger.dataDisplay)
  const nameUser = useSelector((state)=> state.user.data.data.name)
  const dispatch = useDispatch();
  const name = useSelector((state)=>state.messenger.name)
  const [messSend,setMessSend] = useState('')
  const divRef = useRef(null);
  
  
    useEffect(() => {
      // Cuộn đến phần tử cuối cùng của thẻ div khi thêm dữ liệu mới
      if(divRef.current){
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }else{
        console.log('not element');
      }
      
    }, [dataMessenger]);
  
 
   
  useEffect(()=>{
    dispatch(fetchMessenger({getData:true,name:[nameUser,name]}))
    console.log(name);
  },[name])
  
  useEffect(()=>{
     newSocket.on("messenger",(data)=>{
      console.log(data);
      if(data.name.includes(nameUser)){
        dispatch(updateMessenger(data))
      }
      
     })
  },[])

  function close(id){
    const idM = cloneMessenger(id)
    dispatch(idM)   
  }
  

  

  const Content = dataMessenger.map(function(data,index){
    
    
    function send(){
      dispatch(fetchMessenger({postData:true,name:data.name,content:messSend,sender:nameUser}))
    }
    console.log(data.name);
    
    const nameFriend = data.name.find((name)=>{
        return name !== nameUser
      })
   
    const Mess = data.messenger.map(function(messenger,index){
          if(messenger.sender !== nameUser){
            return(
                <div key={index} className="receiveMess" >
                  <div className="i"><i className="fa-solid fa-user">:</i></div>
                  <div className="receiveMess-1" >{messenger.content}</div>
                </div>
            )
          }
        else
        return(
            <div className="sendMess" key={index}>
                <div className="sendMess-1" >{messenger.content}</div>
            </div>
        )
    });

    if(index === 0)
    return(
        <div key={index}  className="Messenger" id="a" >

            <div className="name">{nameFriend} <button onClick={()=>close(data._id)}><i className="fa-solid fa-x"></i></button></div>
            <div ref={divRef} className="contentMess">{Mess}</div>

            <div className="clickSend">
              <input placeholder="send" value={messSend} onChange={(e)=>{setMessSend(e.target.value)}}></input>
              <button onClick={send}><i className="fa-solid fa-arrow-right"></i></button>
            </div>  

        </div>  
    )

    if(index === 1)
    return(
      <div key={index}  className="Messenger" id="b" >

          <div className="name"> {nameFriend} <button onClick={()=>close(data._id)}><i className="fa-solid fa-x"></i></button></div>
          <div ref={divRef} className="contentMess">{Mess}</div>

          <div className="clickSend">
            <input placeholder="send" value={messSend} onChange={(e)=>{setMessSend(e.target.value)}} ></input>
            <button onClick={send}><i className="fa-solid fa-arrow-right"></i></button>
          </div> 

      </div> 
    )

    if(index === 2)
    return(
      <div key={index} className="Messenger" id="c" >

          <div className="name"> {nameFriend} <button onClick={()=>close(data._id)}><i className="fa-solid fa-x"></i></button></div>
          <div ref={divRef}  className="contentMess">{Mess}</div>

          <div className="clickSend">
            <input placeholder="send" value={messSend} onChange={(e)=>{setMessSend(e.target.value)}}></input>
            <button onClick={send}><i className="fa-solid fa-arrow-right"></i></button>
          </div> 

      </div> 
    )
  });
  
  return <div>{Content}</div>

}