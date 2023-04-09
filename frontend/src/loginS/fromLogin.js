import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import '../style/login.css'
import {Login} from './loginSlice'
import {Routes,Route,Link} from "react-router-dom"



export default function FromLogin(){
   
const [account,setAccount] = useState('duycute123');
const [password,setPassword] = useState('qwe123');
const dispatch = useDispatch()
console.log(useSelector(state=>state.user.loading));
function upLogin(){
    console.log(dataInput);
    dispatch(Login(dataInput))
    
}


const dataInput = {account:account,password:password}
    return(
        <div className="body">
            <div className="login">
                  <h1>From Login</h1>
                <div className="input">
                    <input value={account}
                           onChange={(e)=>{setAccount(e.target.value);console.log(e.target.value);}} 
                           type="text" 
                           placeholder="account">
                    </input>
                </div>   
                <div className="input">
                    <input value={password}
                           onChange={(e)=>{setPassword(e.target.value);console.log(e.target.value);}}
                           type='password'
                           placeholder="password"></input>
                </div> 
                <div className="buttonLogin" onClick={upLogin}><button>Login</button></div>
                <div className="buttonSign" ><Link to='/register'>Register</Link></div>
            </div>
        </div>
    )
}