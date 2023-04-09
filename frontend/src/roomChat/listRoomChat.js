import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRoomChat,setDisplay, setOppenModelCreateNewRoomChat } from "../forum/forumSlice";
import './listRoomChat.css'
import ModelCreateNewRoomChat from "./modelCreateNewRoomChat";

export default function ListRoomChat(){
    const name = useSelector((state)=>state.user.data.data.name)
    const nameRoomChats = useSelector((state)=>state.forum.data.roomChat)
    const [oppenListRoom,setOppenListRoom] = useState(false)
    const [nameRoomChat,setNameRoomChat] = useState('')
    
    const dispatch = useDispatch()
   
   
    function create(){
        dispatch(postRoomChat({name:name,nameRoomChat:nameRoomChat,create:true}))
       

     };
     function oppenCreate(){
       
        dispatch(setOppenModelCreateNewRoomChat({name:name,nameRoomChat:nameRoomChat,create:true}))
    }
   

    const NameRoom = nameRoomChats.map(function(room,index){

        function oppenRoomChat(name){
            // dispatch(postRoomChat({name:name,nameRoomChat:nameRoomChat,getData:true}))
            dispatch(setDisplay(room))
           
        }
        return ( <li className="room" key={index}><div className="room-1" onClick={()=>{oppenRoomChat(room.nameRoom)}}>{room.nameRoom}</div></li>)
    })

 

    return(
        <div className="listRoom">
             <div className="search"><input placeholder="search"></input></div>
            <div className="list">
            <ul >
                {NameRoom}
            </ul>
            </div>
            <button 
                className="oppenCreateRoom" 
                onClick={()=>{oppenCreate()}}>
                <i className="fa-solid fa-plus"></i> 
                createRoomChat
                
            </button>
            
            
        </div>
    )
}