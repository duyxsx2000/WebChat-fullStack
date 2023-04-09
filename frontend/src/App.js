import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes,Route,Link, Router,Switch,Navigate} from 'react-router-dom';
import Login from './loginS/fromLogin';
import { useSelector } from 'react-redux';
import Home from './home';
import CheckLogin from './Routes/route';
import Register from './register/register'

function App() {
const loading = useSelector(state=>state.user.loading)
const user = useSelector((sate)=>sate.user.user)

console.log(loading);


  return (
    <div className="App">
      <Routes>
      <Route path='/register' element={!user ? <Register></Register> : (<Navigate to='/' replace/>) }/>
      <Route path="/" element={!loading ? <Login/> : (<Navigate to='/home/*' replace/>)} />
      <Route path='/home/*' element={<CheckLogin loading={loading} Component={Home}/>} />
      <Route path='/login' element={!loading ? <Login/> : (<Navigate to='/home/*' replace/>)}/>
      </Routes> 
      
    </div>
  );
}

export default App;
