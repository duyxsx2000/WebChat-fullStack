import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRoomChat } from "../forum/forumSlice";

import "./addMember.css"


export default function AddMemberRoomChat(){
    const userList = useSelector((state)=>state.user.userList);
    const roomChat = useSelector((state)=>state.forum.data.display)
    const dispatch = useDispatch();
    
    const user = userList.map((user,index)=>{
        
        function addMember(){
            dispatch(postRoomChat({nameRoomChat:roomChat.nameRoom,nameNewMember:user,addNewMember:true}))
        };
          
        const find = roomChat.listMember.find((name)=>{
            return name === user
          });

        if(!find){   
            
        return <li key={index}>{user} <button onClick={addMember}>Add<i className="fa-solid fa-plus"></i></button></li>
        }
        
    })
    return(
     
               <div className="AddMember">
                <div className="AddMember-hed">
                    <i className="fa-regular fa-circle-xmark"></i>
                </div>
                <div className="ulAddMember">
                    <ul className="userList">
                        { user}
                    </ul>
                </div>
                
        </div>
       
      
    )
}