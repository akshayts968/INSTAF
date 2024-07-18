import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Profile from './Profile/Profile';
import Message from './Message/Message';
import Login from './Signup/Login';
import SignUpForm from './Signup/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Main />} />
          <Route path="/p" element={<Message />} />
          <Route path="/p/:id/:Rid" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
