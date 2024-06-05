import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import LinkForm from './components/LinkForm';
import Login from './components/Login';
import SignUp from './components/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchLinks(user.id);
    }
  }, [user]);

  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}/links`);
      setLinks(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
    fetchLinks(user.id);
  };

  const handleSignupSuccess = (user) => {
    setUser(user);
    fetchLinks(user.id);
  };

  const handleLogout = () => {
    axios.delete('/users/sign_out').then(() => {
      setUser(null);
      setLinks([]);
      setRecentlyDeleted([]);
      setSelectedLink(null);
    });
  };

  const handleSuccess = (newLink) => {
    fetchLinks(user.id); // Fetch the updated list of links
    setSelectedLink(null);
  };

  const handleDelete = async (linkId) => {
    try {
      const deletedLink = links.find((link) => link.id === linkId);
      await axios.delete(`/users/${user.id}/links/${linkId}`);
      setLinks(links.filter((link) => link.id !== linkId));
      setRecentlyDeleted([...recentlyDeleted, deletedLink]);
    } catch (error) {
      setError(error);
    }
  };

  const handleRestore = (linkId) => {
    const restoredLink = recentlyDeleted.find((link) => link.id === linkId);
    setRecentlyDeleted(recentlyDeleted.filter((link) => link.id !== linkId));
    setLinks([...links, restoredLink]);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignUp onSignupSuccess={handleSignupSuccess} />} />
          <Route path="/links" element={
            user ? (
              <>
                <LinkForm userId={user.id} link={selectedLink} onSuccess={handleSuccess} />
                <h2 className="text-2xl text-center my-6 text-gray-700 font-semibold">Active Links</h2>
                <ul className="space-y-4 max-w-lg mx-auto">
                  {links.map((link) => (
                    <li key={link.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        {link.logo_url && <img src={link.logo_url} alt={link.platform} className="w-8 h-8 mr-4" />}
                        <a href={link.url} className="text-blue-500 hover:underline">{link.title}</a>
                      </div>
                      <div>
                        <button
                          onClick={() => setSelectedLink(link)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl text-center my-6 text-gray-700 font-semibold">Recently Deleted Links</h2>
                <ul className="space-y-4 max-w-lg mx-auto">
                  {recentlyDeleted.map((link) => (
                    <li key={link.id} className="bg-gray-100 shadow-md p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        {link.logo_url && <img src={link.logo_url} alt={link.platform} className="w-8 h-8 mr-4" />}
                        <span>{link.title}</span>
                      </div>
                      <button
                        onClick={() => handleRestore(link.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        Restore
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-red-500">Please log in to manage your links.</p>
            )
          } />
          <Route path="/" element={
            <div className="text-center">
              <h1 className="text-3xl text-center mb-6 text-gray-800 font-bold">Welcome to Linky Link</h1>
              <p className="text-center text-lg text-gray-600">The best place to store all your important links.</p>
              <img src="/LinkyLogo.png" alt="Linky Link" className="w-1/2 mx-auto mt-6" />
            </div>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
