import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
      alert('Login successful');
      window.location.href = "/";
    } catch (err) {
      alert('Login failed');
    }
  };
  
  const handleSignup = () => {
    window.location.href = "/signup";
  }
  
  return (
    <div className="container">
      <h2>Log In</h2>
      <input placeholder="Email" required onChange={e => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}

export default Login;
