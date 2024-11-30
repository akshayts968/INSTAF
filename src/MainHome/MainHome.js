import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from '../Home/Main'; // Import the Main component
import './MainHome.css'
import SubMain from '../Home/SubMain';
function MainHome({ toggle }) {
  const [posts, setPosts] = useState([]);
  const [currPost, setCurrPost] = useState([]);
  const [separatePost,setSeparatePost] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/post/all');
        const data = response.data;
       // console.log(data, "is this");
        
        setPosts(data.posts);
        setCurrPost(data.posts[0]); // Assuming the API response has a "posts" field
        // setUsers(data.users); // Uncomment if you need to set users
        // setCurrUser(data.currUser); // Uncomment if you need to set the current user
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  //const [commentDiv,setCommentDiv]=useState(false);
  const handlePostClick = (post) => {
    setCurrPost(post);
    setSeparatePost(true);
  };

  const handleCloseClick = () => {
    setSeparatePost(false);
  };
  return (
    <div className="MainHome">
      {separatePost && <SubMain  post={currPost} onClose={handleCloseClick} />}
      {posts.map((post, index) => (
        <Main key={index} post={post} toggle={toggle} onClick={() => handlePostClick(post)}/>
      ))}
    </div>
  );
}

export default MainHome;
