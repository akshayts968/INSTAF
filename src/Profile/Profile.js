import './Profile.css';
import TopProfile from './TopProfile';
import BottomNav from '../NavBar/BottomNav';
import SideNavBar from '../NavBar/SideNavBar';
import MainProfile from './MainProfile/MainProfile';
import { useState,useEffect } from 'react';
function Profile() {
   const [User,setUser]=useState("");
   useEffect(() => {
   const User = JSON.parse(localStorage.getItem('user'));
   console.log(User);
   setUser(User);}, []);
  return (
    <div className="Profile">
       <TopProfile user={User}></TopProfile>
       <SideNavBar></SideNavBar>
       <div className='ProfileMain'>
          <MainProfile></MainProfile>
       </div>
       <BottomNav></BottomNav>
    </div>);
}

export default Profile;