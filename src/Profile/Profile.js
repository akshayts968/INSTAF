import './Profile.css';
import TopProfile from './TopProfile';
import BottomNav from '../NavBar/BottomNav';
import SideNavBar from '../NavBar/SideNavBar';
import MainProfile from './MainProfile/MainProfile';
import SubMain from '../Home/SubMain';
import { useState,useEffect } from 'react';
function Profile() {
   const [currPost, setCurrPost] = useState([]);
   const [separatePost,setSeparatePost] = useState(false);
   const [User,setUser]=useState("");
   useEffect(() => {
   const User = JSON.parse(localStorage.getItem('user'));
   //console.log(User);
   setUser(User);}, []);
   const handlePostClick = (post) => {
      setCurrPost(post);
      setSeparatePost(true);
      //console.log(post,"RTHIS");
    };
    const handleCloseClick = () => {
      setSeparatePost(false);
    };
  return (
    <div className="Profile">
      {separatePost && <SubMain  post={currPost} onClose={handleCloseClick} />}
       <TopProfile user={User}></TopProfile>
       <SideNavBar></SideNavBar>
       <div className='ProfileMain'>
          <MainProfile postView={handlePostClick}></MainProfile>
       </div>
       <BottomNav></BottomNav>
    </div>);
}

export default Profile;