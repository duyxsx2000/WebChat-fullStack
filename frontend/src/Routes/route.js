import React from "react";
import { Navigate} from 'react-router-dom';




// check and redirect user to login page
export default function CheckLogin({loading,Component,}){
  return  loading ? <Component/> : (<Navigate to='/login' replace/>)
}



