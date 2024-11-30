import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function PostADD() {
  const navigate = useNavigate();
  const [Post, setPost] = useState(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const User = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    const { type, files, value } = e.target;

    if (type === "file") {
      const file = files[0];
      setPost(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (type === "text") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    if (Post) {
      formPayload.append("Post", Post);
    }
    if (description) {
      formPayload.append("Description", description);
    }

    try {
      const response = await axios.post(`http://localhost:8080/post/${User._id}/create`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response data:", response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile'); 
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
        <label htmlFor="description">Description:</label><br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
        /><br />
        <input type="submit" value="Save" /><br /><br />
        {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </form>
    </div>
  );
}

export default PostADD;
