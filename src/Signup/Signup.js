import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUpForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const  handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/signup', {
            username: formData.username,
            password: formData.password,
            email:formData.email,
            name:formData.name
          });

        const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/profile");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label><br />
      <input
        type="text"
        id="username"
        name="username"
        required
        value={formData.username}
        onChange={handleChange}
      /><br />
      
      <label htmlFor="name">Name:</label><br />
      <input
        type="text"
        id="name"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      /><br />
      
      <label htmlFor="email">Email:</label><br />
      <input
        type="email"
        id="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
      /><br />
      
      <label htmlFor="password">Password:</label><br />
      <input
        type="password"
        id="password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
      /><br />
      
      <input type="submit" value="Sign Up" /><br /><br />
      <a href="/login">Login</a>
    </form>
  );
};

export default SignUpForm;