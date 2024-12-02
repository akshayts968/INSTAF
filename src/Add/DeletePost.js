import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePost({ postId, onClose, onDelete }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/post/${postId}`);
      onDelete(postId);  // Call the onDelete function to update the posts in the parent component
      onClose();
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='delete-confirmation'>
      <h1>Are you sure you want to delete this post?{postId}</h1>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default DeletePost;
