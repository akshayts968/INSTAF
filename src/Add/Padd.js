import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function PostADD(props) {
  const navigate = useNavigate();
  const [Post, setPost] = useState(null);
  const [preview, setPreview] = useState(null);
  const User = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    const { type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setPost(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    if (Post) {
      formPayload.append("Post", Post);
    }

    try {
      const response = await axios.post(`http://localhost:8080/${User._id}/Post`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      //dk
      navigate('/profile'); // Log the response data if needed
      // Optionally handle success, update state, or navigate
    } catch (error) {
      console.error("Error uploading post:", error);
      // Optionally handle error, display error message to user
    }
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="profile">Profile:</label><br />
        <input
          type="file"
          id="profile"
          name="profile"
          onChange={handleChange}
        /><br />

        <input type="submit" value="Save" /><br /><br />
        {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </form>
    </div>
  );
}

export default PostADD;
