import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Edit(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: props.username,
    name: props.name,
    email: props.email,
    profile: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        profile: file,
      });

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const User = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    if (formData.profile) {
      formPayload.append("profile", formData.profile);
    }

    try {
      const response = await axios.post(`http://localhost:8080/${User._id}/edit`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(formPayload);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
      // localStorage.setItem('user', JSON.stringify(response.data));
      //navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        /><br />

        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /><br />

        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
        /><br />

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

export default Edit;