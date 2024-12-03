import './Message.css';
import SideNavBar from '../NavBar/SideNavBar';
import TopProfile from '../Profile/TopProfile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleMsg from './SingleMsg';
import fetchData from './component/fetchData';
import MessageOne from './pages/MessageOne';
import MessageBox from './pages/MessageBox';
import ProfileMSg from './pages/ProfileMSg';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_SERVER}`);

function MessageInd(){
  return (
    <div className='MessageInd'>
      <div className='MessageIndTOP'>

      </div>
    </div>
  )
}
function Message() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);
const { id, Rid } = useParams();
const [MessageList,SetMessageList] = useState("");
const [Receiver,setReceiver] = useState([]);
const [MsgView,setMsgView]= useState(false);
const [room,setRoom] = useState("");
console.log("weee",id,Rid)

useEffect(() => {
  socket.on('sendMessage', (data) => {
    console.log('Received message:', data);
    SetMessageList((prevMessages) => [...prevMessages, data]);
  });

  return () => {
    socket.off('sendMessage');
  };
}, [MessageList]);

const contentSave = (message) => {
  SetMessageList((prevMessages) => [...prevMessages, message]);
};
useEffect(()=>{
  if(Rid){
    const room = [id, Rid].sort().join('-');
    alert(room)
    setRoom(room);
    socket.emit('joinRoom',room );
    const fetchData = async () => {
      try {
        setMsgView(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/user/${Rid}`); 
        console.log("jlk",response);
        setReceiver(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }
},[Rid]);
useEffect(()=>{
  const fetchMessageData = async () => {
    try {
      //localStorage.setItem('Receiver', JSON.stringify(Receiver));
      const data = await fetchData(id, Rid||"65e1a495c70584ed53f70213");
      console.log(id, Rid,"WAFA")
      SetMessageList(data); 
    } catch (error) {
      console.error('Error in fetchMessageData:', error);
    }
  };
  fetchMessageData();
},[Receiver]);

const [ChatList,setChatList] = useState("");
const storedUser = JSON.parse(localStorage.getItem('user'));
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/all`); 
      console.log(response);
      setChatList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);

  return (
    <>
    <SideNavBar></SideNavBar>
    <div className="Message">
        <TopProfile cl={"Message_TOP"} username={storedUser.username}></TopProfile>
        <div className='Message-header'>
            <div className='Message-TL'>Messages</div>
            <div className='request'>Request</div>
        </div>
        {ChatList && ChatList.map((messageId) => (
          <Link to={`/p/${storedUser._id}/${messageId._id}`}>
          <MessageOne key={messageId._id} profile={messageId.profile} name={messageId.name} ></MessageOne></Link>
        ))}
    </div>
    {MsgView&&<div className='MessageView'>
       <MessageInd></MessageInd>
       <div className='msgMain'>
       <ProfileMSg key={Receiver._id} id={Receiver._id}  name={Receiver.name} profile={Receiver.profile} ></ProfileMSg>
       {MessageList && MessageList.map((msg, index) => (
        <SingleMsg key={index} message={msg} id={msg._id} userid={Receiver._id} sender={msg.sender} profile={Receiver.profile} receiver={msg.receiver} content={msg.content} />
      ))}
       </div>
       <MessageBox RID={Receiver._id} socket={socket} room={room} contentSave={contentSave}></MessageBox>
    </div>}
    </>
  );
}

export default Message;
