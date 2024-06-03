import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Links from './Links';

const User = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <Links userId={user.id} />
    </div>
  );
};

export default User;
