import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./forum.css";
import {io} from 'socket.io-client'
import PersonalChat from "./personalChat";
import GrupChat from "./groupChat";
import RoomChat from "../roomChat/roomChat";
import ModelCreateNewRoomChat from "../roomChat/modelCreateNewRoomChat";
import ContenMessenger from "../messenger/contentMess";

const newSocket = io('');
export default function Forum(){
  
    const name = useSelector((state)=>state.user.data.data.name)
    const oppenModelCreateNewRoomChat = useSelector((state)=>state.forum.data.oppenModelCreateNewRoomChat)
    const dispatch = useDispatch()
    const loadingMess = useSelector((state)=>state.messenger.openMessenger)
    const display = useSelector((state)=> state.forum.data.display)
    
    useEffect(() => {  
        newSocket.emit("nameUser",name)
        return () => {
            newSocket.disconnect();
            newSocket.close();
        };
    },[]);

    return(
        <div className="forum">
            <div className="personalChat"><PersonalChat></PersonalChat></div>
            {display < 1 ? <GrupChat newSocket={newSocket}/> : <RoomChat newSocket={newSocket}/>}
            {oppenModelCreateNewRoomChat && <ModelCreateNewRoomChat/>} 
            {loadingMess &&<ContenMessenger newSocket={newSocket}></ContenMessenger>}
        </div>
    )
}