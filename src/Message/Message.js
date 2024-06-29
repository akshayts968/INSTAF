import './Message.css';
import SideNavBar from '../NavBar/SideNavBar';
import TopProfile from '../Profile/TopProfile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MessageBox(){
  return (
    <div className='MessageBox'>
       <div className='Message-Box'>
         <EmojiEmotionsIcon className='Emoji'></EmojiEmotionsIcon>
         <div className='INPUT'></div>
         <MicIcon className='Emoji'></MicIcon>
         <PhotoIcon className='Emoji'></PhotoIcon>
         <FavoriteBorderIcon className='Emoji'></FavoriteBorderIcon>
       </div>
    </div>
  )
}
function MessageInd(){
  return (
    <div className='MessageInd'>
      <div className='MessageIndTOP'>

      </div>
    </div>
  )
}
function ProfileMSg(){
  return (
    <div className='ProfileMSg'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'></img>
      <div>APNA COLLEGE</div>
      <div>Officialapnacollege . insta</div>
      <div className='viewPro'>view profile</div>
    </div>
  )
}
function MessageOne(){
    return (
        <div className='MessageOne'>
           <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'></img>
           <div className='MO1'>
             <span className='name'>Akshay</span>
             <div className='info'>Last seen 14:50</div>
           </div>
        </div>
    )
}
function Message() {
  return (
    <>
    <SideNavBar></SideNavBar>
    <div className="Message">
        <TopProfile cl={"Message_TOP"}></TopProfile>
        <div className='Message-header'>
            <div className='Message-TL'>Messages</div>
            <div className='request'>Request</div>
        </div>
        <MessageOne></MessageOne>
        <MessageOne></MessageOne>
    </div>
    <div className='MessageView'>
       <MessageInd></MessageInd>
       <ProfileMSg></ProfileMSg>
       
       <MessageBox></MessageBox>
    </div>
    </>
  );
}

export default Message;
