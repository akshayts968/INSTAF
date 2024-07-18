import React, { useEffect, useState } from 'react';
import './SubMain.css'
import axios from 'axios';
import Comment from './Comment';
import { common } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const SubMain = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/fetchcomment/${props.post._id}`, {
          timeout: 100000 // 10 seconds timeout
        });
        const data = response.data;
        console.log("data", data);
        setComments(data.comments);
        console.log("data",data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, []);

  // Function to dis

  const handleCommentAdd = () => {
    console.log('Adding comment:', newComment);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div className="centre-display">
      <div className="centre-display-div">
        <div className="video-side">
          { <img className="video-side-img" alt="" src={props.post.videourl} /> }
        </div>
        <div className="comment-side">
          <div className="cs-head">
            <img
              className="status-img rounded-circle"
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#ccc',
                objectFit: 'cover'
              }}
              
              src="https://image.telanganatoday.com/wp-content/uploads/2023/10/Anushka-4_V_jpg--442x260-4g.webp?sw=412&dsz=442x260&iw=412&p=false&r=2.625"
              alt=""
            />
            <div>
              <span className="cs-head-sp-1">hai</span><br />
              <span className="cs-head-sp-2">hai</span>
            </div>
            <button>...</button>
          </div>
          <div className="cs-mid">
            <div className="cs-mid-div-1"></div>
            <div className="cs-mid-div-2">
            {comments.map((comment) => (
              <Comment key={comment.id} text={comment.text} username={comment.owner.username} ownerId={comment.owner} owner={comment.owner.profile} />
            ))}
            </div>
          </div>
          <div className="cs-bottom">
            <div className="cs-bottom-1">
              <div className="cs-bottom-1-1">
                <span><i className="fa-solid fa-heart heartBeat"></i></span>
                <span><i className="fa-regular fa-comment"></i></span>
                <span><i className="fa-solid fa-paper-plane"></i></span>
              </div>
              <div className="cs-bottom-1-2"><i className="fa-solid fa-note-sticky"></i></div>
            </div>
            <div className="cs-bottom-2">
              <span>Liked by sachin and others</span>
            </div>
            <span>12 hours ago</span>
          </div>
          <div className="cs-comment">
            <div className="add-comments">
              <textarea onChange={handleInputChange} value={newComment} name="comment" id="comment" cols="30" rows="auto" placeholder="Add comments..."></textarea>
              <a className="ml-1" onClick={handleCommentAdd}>Post</a>
            </div>
          </div>
        </div>
      </div>
      <button className="closeButton" onClick={props.onClose}><FontAwesomeIcon icon={faXmark} /></button>
    </div>
  );
};

export default SubMain;
