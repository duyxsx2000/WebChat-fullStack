import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRoomChat, setOppenModelCreateNewRoomChat } from "../forum/forumSlice";

import "./model.css"



export default function ModelCreateNewRoomChat(){
    const nameUser = useSelector((state)=>state.user.data.data.name);
    const [nameRoom,setNameRoom] = useState('')
    const dispatch = useDispatch()
     
    function create(event){
        event.preventDefault();
        dispatch(postRoomChat({name:nameUser,nameRoomChat:nameRoom,create:true}))
    }
    
    function closeModel(){
        dispatch(setOppenModelCreateNewRoomChat())
    }

   
    return(
        <div className="SurroundedModel">
            <div className="modelCreateNewRoomChat">
                <div className="modelTitle"> <span>create Room Chat</span><i onClick={closeModel} className="fa-regular fa-circle-xmark"></i></div>
                <form className="modelForm">
                    <label>name Room</label>
                    <input type="text" value={nameRoom} onChange={(e)=>{setNameRoom(e.target.value)}} placeholder="name room"></input>
                    <button onClick={create}>create</button>
                    <button>add Member</button>
                </form>
                
            </div>
        
        </div>
    )
       
   
}