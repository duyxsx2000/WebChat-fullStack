import React, { useState } from "react";
import './register.css'
import { fetchRegister } from "../loginS/loginSlice";
import { useDispatch, useSelector } from "react-redux";



export default function Register(){
    const [account,setAccount] = useState('')
    const [name,setName] = useState('')
    const [sdt,setSdt] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const statusRegister = useSelector((state)=>state.user.statusRegister)
    const user = useSelector((state)=>state.user.user)
console.log(statusRegister);
    const dataRegister = {account:account,name:name,sdt:sdt,password:password}
    function upRegister(){
           dispatch(fetchRegister(dataRegister))
    }
    return(
        <div className="register">
             <div className="register-1">
                  <h1>From Register</h1>
                <div className="input">
                    <input 
                           value={account}
                           type="text" 
                           placeholder="account"
                           onChange={(e)=>{setAccount(e.target.value)}}>
                    </input>
                </div> 
                <div className="input">
                    <input 
                           value={name}
                           type="text" 
                           placeholder="name"
                           onChange={(e)=>{setName(e.target.value)}}>
                    </input>
                </div> 
                <div className="input">
                    <input 
                           value={sdt}
                           type="text" 
                           placeholder="sdt"
                           onChange={(e)=>{setSdt(e.target.value)}}>
                    </input>
                </div>  
                <div className="input">
                    <input 
                           value={password}
                           type='password'
                           placeholder="password"
                           onChange={(e)=>{setPassword(e.target.value)}}>

                    </input>
                </div> 

                <div className="buttonRegister" ><button onClick={()=>{upRegister()}}>Register</button></div>
                <div className="buttonLogin" ><button>Login</button></div>
                
                {statusRegister && <div className="notification">Account or name already exists</div>}
                {user && <div className="notification">Register success</div>}
            </div>
        </div>
    )
}