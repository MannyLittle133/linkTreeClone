import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/users/1/links') // Adjust the URL based on your API endpoint
      .then(response => setLinks(response.data))
      .catch(error => setError(error));
  }, []);

  return (
    <div className="App">
      <h1>Links</h1>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

