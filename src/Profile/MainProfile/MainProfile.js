import './MainProfile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import Edit from '../../Add/Edit';
import PostADD from '../../Add/Padd';
import DeletePost from '../../Add/DeletePost'; // Adjusted import name

function Post({ post,img, onClick,postView, index }) {
  const handleClick = () => {
    onClick(index);
    postView(post);
  };
  return (
    <div className='img' onClick={handleClick}>
      <img
        className='img20'
        src={img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'}
        alt='Post'
      />
    </div>
  );
}

function Bar({ title, curr, index, setCurr }) {
  const currSelect = curr === index ? ' Select' : '';
  return (
    <div className={`${title}${currSelect}`} onClick={() => setCurr(index)}>
      {title}
    </div>
  );
}

function PostBar() {
  const [curr, setCurr] = useState(0);
  const bar = ['POSTS', 'SAVED', 'TAGGED'];
  return (
    <div className='postBar'>
      {bar.map((item, index) => (
        <Bar title={item} key={index} index={index} curr={curr} setCurr={setCurr} />
      ))}
    </div>
  );
}

function MainProfile(props) {
  const [edit, setEdit] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [deletePost, setDeletePost] = useState(null); // Changed to store post ID to be deleted
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  const [follow,setFollow] = useState("AK");
  const toggleEdit = () => setEdit(!edit);
  const toggleAddPost = () => setAddPost(!addPost);
   // Set the post ID for deletion
  const closeDeletePost = () => setDeletePost(null); // Clear the delete post state
  const User = JSON.parse(localStorage.getItem('user'));
  const [nPost,setNPost] = useState(0);
  const [nFollowers, setNFollowers] = useState(0);
  const [nFollowing, setNFollowing] = useState(0);
  const [sameUSer,setSameUSer] = useState(false);
  const confirmDeletePost = (postId) =>{
    console.log(postId,user.post.includes(postId),user,"DATA OF HIM");
    //if(user.post.includes(postId))
    setDeletePost(postId)
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (storedUser && Array.isArray(storedUser.followings)) {
      if (id && storedUser.followings.includes(id)) {
        setFollow("Following");
      } else {
        setFollow("Follow");
      }
      setNFollowers(storedUser.nFollowers);
      setNFollowing(storedUser.nFollowing);
      console.log(storedUser.followings,storedUser.followings.includes(id),storedUser,"data is this ,an")
    } else {
      console.error("Stored user data is invalid or followers is not an array");
    }
  }, [id]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = id
          ? await axios.get(`http://localhost:8080/post/${id}`)
          : await axios.get(`http://localhost:8080/post/${User._id}`);
        console.log(response,"data");
        setPosts(response.data.data);
        setProfileData(response.data.User);
        setNFollowers(response.data.User.nFollowers);
        setNFollowing(response.data.User.nFollowing);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id]);

  const handlePostDelete = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };
  async function followADD(){
    const response = await axios.put(`http://localhost:8080/user/${id}/${User._id}`);
    console.log(response,"data");
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    setProfileData(response.data.coMan);
  }

  return (
    <div className='MainProfile'>
      {edit && <Edit />}
      {addPost && <PostADD />}
      {deletePost && (
        <DeletePost postId={deletePost} onClose={closeDeletePost} onDelete={handlePostDelete} />
      )}

      <div className='header'>
        <div className='item1'>
        <div
  className="item1Img"
  style={{
    backgroundImage: `url(${profileData.profile})`, // Add `url()` to wrap the image URL
  }}
>
</div>

        </div>
        <div className='item2'>
          <div className='username'>{profileData.name || 'ak__s_h__ay'}</div>
          {id ? (
            <div className='UserB2 Follow' onClick={followADD}>{follow}</div>
          ) : (
            <div className='UserB2' onClick={toggleEdit}>
              Edit Profile
            </div>
          )}
          <div className='UserB2'>View archive</div>
        </div>
        <div className='item3'>
          <div className='NPost'>{profileData.nPost || '0'} posts</div>
          <div className='NPost'>{profileData.nFollowers || '0'} followers</div>
          <div className='NPost'>{profileData.nFollowing || '0'} following</div>
        </div>
        <div className='item4'>
          <div className='Name'>{profileData.name || '0'}</div>
          <div className='threadName'>@ ak__s_h__ay</div>
        </div>
        <div className='item5'>Item 5</div>
      </div>
      <div className='Highlights' onClick={toggleAddPost}>
        <div className='newHigh'>
          <div className='newHighD'>
            <AddIcon className='plus' />
          </div>
        </div>
      </div>
      <PostBar />
      <div className='Posts'>
        {posts.map((post) => (
          <Post key={post._id} index={post._id} img={post.videourl} post={post} postView={props.postView} onClick={confirmDeletePost} />
        ))}
      </div>
    </div>
  );
}

export default MainProfile;
