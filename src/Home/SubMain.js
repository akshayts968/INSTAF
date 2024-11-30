import React, { useEffect, useState } from 'react';
import './SubMain.css';
import axios from 'axios';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment, faBookmark, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
const socket = io('http://localhost:8080');

const SubMain = (props) => {
  const [replyTo, setReplyTo] = useState("");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currUser, setCurrUser] = useState("");
  const [room, setRoom] = useState("");
  const User = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setRoom(props.post._id);
  }, [props.post._id]);

  useEffect(() => {
    socket.on('sendComment', (data) => {
      console.log('Received comment:', data);
      //console.log('Received comments:', comments);
      setComments((prevComments) => [...prevComments, data]);
    });

    return () => {
      socket.off('sendComment');
    };
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit('joinRoom', room);
    }
  }, [room]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (props.post.postOwner.username) {
          setCurrUser(props.post.postOwner);
        } else {
          if (User._id === props.post.postOwner) {
            setCurrUser(User);
          } else {
            const response = await axios.get(`http://localhost:8080/user/${props.post.postOwner}`, {
              timeout: 100000 
            });
            console.log('comments are',response)
            setCurrUser(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [props.post]);
  const [date,setDate] = useState("");
  useEffect(() => {
      
      function getDaysDifference() {
          const givenDate = new Date(props.post.date);
          const currentDate = new Date();
          const differenceInTime = currentDate - givenDate;
          
          const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
          if (differenceInDays >= 1) {
            setDate(`${differenceInDays} d`);
            return;
          }
          
          const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
          if (differenceInHours >= 1) {
            setDate(`${differenceInHours} hr`);
            return;
          }
          
          const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
          if (differenceInMinutes >= 1) {
            setDate(`${differenceInMinutes} min`);
            return;
          }
          
          setDate(`Just now`);
        }
        
      getDaysDifference();
    }, [props.post._id]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comment/${props.post._id}`, {
          timeout: 100000 
        });
        const data = response.data;
        console.log('comment',data);
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [props.post._id]);

  const handleCommentAdd = async () => {
    if (!newComment.trim()) {
      console.error("Comment cannot be empty");
      return;
    }

    const User = JSON.parse(localStorage.getItem('user'));
    const post = props.post._id;
    try {
      socket.emit('joinRoom', room);
      const response = await axios.put(`http://localhost:8080/post/${post}`, { comment: newComment, post, userId: User._id,commentId:replyTo }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response,"data is this")
      //socket.emit('sendComment', { room: room, content: response.data });
      if (response.status === 200) {
        const savedComment = response.data.savedComment;
        socket.emit('sendComment',  { room: room, content: savedComment });
        setComments(prevComments => [...prevComments, savedComment]);
        setNewComment("");
        console.log("Database updated successfully",response.data);
      } else {
        console.error("Failed to update database");
      }
    } catch (error) {
      console.error("Failed to update database", error);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setNewComment(newValue);

    const postButton = event.target.nextElementSibling;
    if (postButton) {
      if (newValue.trim()) {
        postButton.style.display = 'flex';
      } else {
        postButton.style.display = 'none';
      }
    }
  };

  const currText = (username,cId) => {
    console.log(username,cId,"is this");
    setReplyTo(cId);
    console.log(replyTo,"is this");
    setNewComment(`@${username} `);
  };
  return (
    <div className="centre-display">
      <div className="centre-display-div">
        <div className="video-side">
          <img className="video-side-img" alt="" src={props.post.videourl} />
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
              src={currUser.profile||props.post.postOwner.profile}
              alt=""
            />
            <div>
              <span className="cs-head-sp-1">{currUser.username}</span><br />
              {//<span className="cs-head-sp-2">hai</span>
               }
            </div>
            <button>...</button>
          </div>
          <div className="cs-mid">
                      
          <div className="cs-mid-div-2">
          <div className="cs-mid-div-1">
            <span>
          <img className='IMG-Des' src={currUser.profile} alt="'Profile Image'"/></span>
              <div className='Description'>
              <span className='commentUsername'>{currUser.username}</span> {props.post.description || "Anant and Radhika, your wedding was a magical start to a lifelong partnership. May your journey together be an incredible adventure filled with love, joy, and countless unforgettable moments. Wishing you a lifetime of happiness and success!"}</div>
          </div>
              {comments.map((comment) => (
                <Comment key={comment._id} index={comment._id} text={comment.text} replies={comment.replies}  ownerId={comment.owner} owner={comment.owner.profile} date={comment.date} currText={currText}/>
              ))}
            </div>
          </div>
          <div className="cs-bottom">
            <div className="cs-bottom-1">
              <div className="cs-bottom-1-1">
              <div className="post-buttons">
          <span className="ml-2">
            <FontAwesomeIcon  icon={faHeart} />
            <FontAwesomeIcon  icon={faComment} />
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
          <span className="ml-2">
            <FontAwesomeIcon icon={faBookmark} />
          </span>
        </div>
              </div>
              <div className="cs-bottom-1-2"><i className="fa-solid fa-note-sticky"></i></div>
            </div>
            <div className="cs-bottom-2">
              <span>Liked by sachin and others</span>
            </div>
            <span className="cs-bottom-2 posttime">{date}</span>
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
