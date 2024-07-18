import { useState,useEffect } from "react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
function MessageBox(props){
    const [message, setMessage] = useState('');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };
    const handleSubmit = async () => {
      try {
        const payload = {
          content: message
        };
        const response = await axios.post(`http://localhost:8080/Messages/${storedUser._id}/${props.RID}`, payload);
        console.log("content0",response.data);
        console.log("content0",message);
        props.socket.emit('sendMessage', { room: props.room, content:response.data });
        props.contentSave(response.data);
        setMessage('');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    return (
      <div className='MessageBox'>
        <div className='Message-Box'>
          <EmojiEmotionsIcon className='Emoji' />
          <div className='INPUT'>
            <input 
              placeholder='Write Message' 
              value={message} 
              onChange={handleInputChange} 
            /><button  onClick={handleSubmit}>Submit</button>
          </div>
          <MicIcon className='Emoji' />
          <PhotoIcon className='Emoji' />
          <FavoriteBorderIcon className='Emoji' />
        </div>
      </div>
    )
  }
  export default MessageBox;