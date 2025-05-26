import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Signup() {
  const [form, setForm] = useState({ name: '', age: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/signup', form);
      alert('Signup successful');
      return window.location.href = "/login";
    } catch (err) {
      alert('Signup failed');
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  }  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;
