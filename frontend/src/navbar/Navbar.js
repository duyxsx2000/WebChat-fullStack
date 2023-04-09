import React, { useState } from "react";
import {Routes,Route,Link} from "react-router-dom"
import logo   from './th (1).jpg'
import ListFriend from "../listFriend/listFriend";
import './nav.css'
import ListRoomChat from "../roomChat/listRoomChat";


export default function Navbar(){
   const [openListFriend,setOpenListFriend] = useState(false)
   const [openListR,setOpenListR] = useState(false)
   function openFriend() {
   !openListFriend ? setOpenListFriend(true) : setOpenListFriend(false)
   }
   function openListRoom(){
    !openListR ? setOpenListR(true) : setOpenListR(false)
   }
  
  return(
        <nav>
        <ul>
        <img src={logo}></img>
          <li>
            <Link to='#'><i className="fa-solid fa-house"></i>Update Later</Link>
          </li>
          <li>
            <Link to='#'><i className="fa-solid fa-user"></i>Update Later</Link>
          </li>
          <li>
            <Link to='#'><i className="fa-solid fa-ellipsis-vertical"></i>Update Later</Link>
          </li>
        </ul>
        <div className="openListFriend"><button onClick={()=>openFriend()}><i className="fa-solid fa-comment-dots"></i> Messenger</button>{openListFriend && <ListFriend></ListFriend>}</div>
        <div className="openListFriend"><button onClick={()=>openListRoom()}><i className="fa-solid fa-users"></i> Room Chat List</button>{openListR &&<ListRoomChat></ListRoomChat>}</div>
        
      </nav>
    )
}

// 