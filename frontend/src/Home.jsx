import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile', { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  const logout = () => {
    axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
      .then(() => {
        alert("Logged out");
        window.location.href = "/login";
      });
  };

  return (
    <div>
      <h2>Welcome</h2>
      {profile ? (
        <div className='home'>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Age: {profile.age}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}

export default Home;
