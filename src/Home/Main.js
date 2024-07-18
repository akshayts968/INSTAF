import React, { useEffect, useState } from 'react';
import './Main.css';
import SubMain from './SubMain';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
function playPause(obj) {
  if (obj.paused) {
    obj.play();
  } else {
    obj.pause();
  }
}

function Main({ post,onClick }) {
  const [con, setCon] = useState(true);
const currUser = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const commentBoxes = document.querySelectorAll(".comment");
    commentBoxes.forEach(commentBox => {
      const parentDiv = commentBox.parentElement;
      commentBox.addEventListener("input", () => {
        const postButton = parentDiv.querySelector(".post-button");
        if (commentBox.value.trim().length !== 0) {
          postButton.style.display = 'flex';
        } else {
          postButton.style.display = 'none';
        }
      });
    });
  }, []);

  const heartBeat = (icon) => {
    icon.classList.toggle('clicked');
  };

  const typing = (obj) => {
    const postButton = obj.nextElementSibling;
    if (obj.value.trim().length !== 0) {
      postButton.style.display = 'flex';
    } else {
      postButton.style.display = 'none';
    }
  };

  const commentAdd = async (link, post) => {
    const textarea = link.parentNode.querySelector('textarea');
    const comment = textarea.value;
  
    if (!post) {
      const postId = document.querySelector(".video-side-img");
      //post = postId.alt;
    }
    const User = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.put(`http://localhost:8080/post/${post}`, { comment, post,userId: User._id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        textarea.value = '';
        console.log("Database updated successfully");
      } else {
        console.error("Failed to update database");
      }
    } catch (error) {
      console.error("Failed to update database", error);
    }
  };
  
  const centreVideo = (obj, postStr, userStr, currUserStr) => {
    let currUserId = "";
    if (currUserStr) {
      currUser = JSON.parse(currUserStr);
      currUserId = currUser._id;
    }

    let dataPost;
    if (userStr) {
      const dataObject = JSON.parse(userStr);
      const username = dataObject.username;
      let img = document.querySelector(".status-img");
      let name = document.querySelector(".cs-head-sp-1");
      img.src = dataObject.profile;
      name.innerHTML = username;
      dataPost = JSON.parse(postStr);
      let val = dataPost._id;
      //fetchCommand(dataPost.comments, dataPost._id, currUserId);
    }

    let centreDiv = document.querySelector(".centre-display");
    if (!postStr) {
      if (con) {
        let video = obj.querySelector('video');
        let currentSource = video.getAttribute('src');
        centreDiv.classList.add("display-flex");
        let centreDivVideo = `<video class="video-side-v" autoplay loop src="${currentSource}" onclick="playPause(this)"></video>`;
        let v = document.querySelector('.video-side');
        v.innerHTML = centreDivVideo;
      } else {
        let adjacentElement = obj.previousElementSibling;
        obj = adjacentElement.querySelector('video');
        obj.pause();
        centreDiv.classList.remove("display-flex");
      }
    } else {
      if (con) {
        centreDiv.classList.add("display-flex");
        let str = dataPost.videourl.replace(/"/g, '').trim();
        let centreDivVideo = `<img class="video-side-img" src="${str}" alt="${dataPost._id}" style="object-fit: cover; width: 100%; height: 100%;">`;
        let v = document.querySelector('.video-side');
        v.innerHTML = centreDivVideo;
      } else {
        let adjacentElement = obj.previousElementSibling;
        obj = adjacentElement.querySelector('video');
        if (obj) {
          obj.pause();
        }
        centreDiv.classList.remove("display-flex");
      }
    }
    setCon(!con);
  };
  return (
    
    <div className="home-post" >
    
      <div className="post-heading">
        <span className="home-post-profile-pic">
          <img src={post.postOwner.profile} alt="" />
        </span>
        <span className="home-post-ownername">
          <span className="ml-3" style={{ color: '#f5f5f5' }}>{post.postOwner.username}</span>
          <span style={{ color: '#f5f5f5' }}>4h</span>
        </span>
        <span className="float-right">...</span>
      </div>
      <div className="hPost" onClick={onClick}>
        <img src={post.videourl} alt="" />
      </div>
      <div className="post-detail">
        <div className="post-buttons">
          <span className="ml-2">
          <FontAwesomeIcon onClick={(e) => heartBeat(e.target)} icon={faHome} />
          <FontAwesomeIcon onClick={(e) => centreVideo(e.target, JSON.stringify(post), JSON.stringify(post.postOwner), JSON.stringify(currUser))} icon={faHeart} />
          </span>
          <span
            
            className="ml-2"
          >
          <FontAwesomeIcon icon={faFacebook} />
          </span>
        </div>
        <div className="add-Comments">
          <textarea
            onInput={(e) => typing(e.target)}
            name="comment"
            id="comment"
            className="comment"
            cols="30"
            rows="auto"
            placeholder="Add comments..."
          ></textarea>
          <a className="ml-1 post-button" onClick={(e) => commentAdd(e.target, post._id)} style={{ display: 'none' }}>Post</a>
        </div>
      </div>
    </div>
  );
}

export default Main;
