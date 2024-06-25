import './Profile.css';
import TopProfile from './TopProfile';
import BottomNav from '../NavBar/BottomNav';
import SideNavBar from '../NavBar/SideNavBar';
import MainProfile from './MainProfile/MainProfile';
function Profile() {
  return (
    <div className="Profile">
       <TopProfile></TopProfile>
       <SideNavBar></SideNavBar>
       <div className='ProfileMain'>
          <MainProfile></MainProfile>
       </div>
       <BottomNav></BottomNav>
    </div>);
}

export default Profile;