import React from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { useSelector } from 'react-redux';
import Forum from './forum/forum';
function Home() {
const loading = useSelector(state=>state.user.loading)
console.log(loading);

 
  return (

    <div className="Home">
      
      <Navbar></Navbar>

      <div className='bodyPart'>
        <Forum></Forum>
      </div>

    </div>
  );
}

export default Home;
