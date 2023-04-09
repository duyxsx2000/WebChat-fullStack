import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRoomChat,setDisplay } from "./forumSlice";




export default function PersonalChat(){

    const name = useSelector((state)=>state.user.data.data.name)
   
    return(
        <div className="hed">
            <div className="statusUser">
                <div>img</div>
                <span>{name}</span>
                <button><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
         
        </div>
    )
}