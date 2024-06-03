import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Links = ({ userId }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get(`/users/${userId}/links`)
      .then(response => setLinks(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  return (
    <div>
      {links.map(link => (
        <div key={link.id}>
          <a href={link.url}>{link.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Links;
