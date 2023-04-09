import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessenger, openMessenger } from "../messenger/messengerSlice";
import './listFriend.css'
import { fetchLisrfriend } from "./listfriendSlice";

export default function ListFriend(){
    const nameUser = useSelector((state)=> state.user.data.data.name)
    const listFriend = useSelector((state)=> state.listFriend.data);
    const loading = useSelector((state)=> state.listFriend.loading);
    const status = useSelector((state)=> state.listFriend.status);
    const dispatch = useDispatch();
    const [nameFriend,setNameFriend] = useState('')
    const test = useSelector((state)=> state.messenger.dataDisplay)
   
    useEffect(()=>{
        if(!status){dispatch(fetchLisrfriend(nameUser))}
        
    
    },[])
   
function openMess(name){
   
    dispatch(openMessenger(name))
    console.log(test,'test');
    
    
}
    const Friend = listFriend.map(function(name,index){
        return ( <li className="friend" key={index}><div className="friend-1">{name}<button onClick={()=>openMess(name)}> <i className="fa-brands fa-facebook-messenger"></i></button></div></li>)
    })

  if(loading){
    return(
        <div className="listFriend">
             <div className="search"><input placeholder="search"></input></div>
            <ul >
                <li>Loading.....</li>
            </ul>
          
        </div>
    )
  }

    return(
        <div className="listFriend">
             <div className="search"><input placeholder="search"></input></div>
            <ul >
                {Friend}
            </ul>
          
        </div>
    )
}