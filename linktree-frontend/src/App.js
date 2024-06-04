// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkForm from './LinkForm';

function App() {
  const [links, setLinks] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [error, setError] = useState(null);

  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    axios.get(`/users/${userId}/links`)
      .then(response => setLinks(response.data))
      .catch(error => setError(error));
  }, [userId]);

  const handleSuccess = (newLink) => {
    if (selectedLink) {
      setLinks(links.map(link => (link.id === newLink.id ? newLink : link)));
    } else {
      setLinks([...links, newLink]);
    }
    setSelectedLink(null);
  };

  const handleDelete = async (linkId) => {
    try {
      const deletedLink = links.find(link => link.id === linkId);
      await axios.delete(`/users/${userId}/links/${linkId}`);
      setLinks(links.filter(link => link.id !== linkId));
      setRecentlyDeleted([...recentlyDeleted, deletedLink]);
    } catch (error) {
      setError(error);
    }
  };

  const handleRestore = (linkId) => {
    const restoredLink = recentlyDeleted.find(link => link.id === linkId);
    setRecentlyDeleted(recentlyDeleted.filter(link => link.id !== linkId));
    setLinks([...links, restoredLink]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-4 text-blue-500">Links</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <LinkForm userId={userId} link={selectedLink} onSuccess={handleSuccess} />
      <h2 className="text-xl text-center mb-4">Active Links</h2>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.id} className="bg-white shadow-md p-4 rounded flex justify-between items-center">
            <a href={link.url} className="text-blue-500">{link.title}</a>
            <div>
              <button onClick={() => setSelectedLink(link)} className="mr-2">Edit</button>
              <button onClick={() => handleDelete(link.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl text-center mb-4">Recently Deleted Links</h2>
      <ul className="space-y-2">
        {recentlyDeleted.map(link => (
          <li key={link.id} className="bg-gray-200 shadow-md p-4 rounded flex justify-between items-center">
            <span>{link.title}</span>
            <button onClick={() => handleRestore(link.id)} className="text-green-500">Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
