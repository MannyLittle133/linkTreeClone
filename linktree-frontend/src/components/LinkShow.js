import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const LinkShow = ({ userId }) => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLinks(userId);
  }, [userId]);

  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}/links`);
      setLinks(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-center my-6 text-gray-700 font-semibold">Customize Your Page</h2>
      {error && <p className="text-center text-red-500">{error.message}</p>}
      <div className="space-y-4 max-w-lg mx-auto">
        {links.map((link) => (
          <div key={link.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              {link.logo_url && <img src={link.logo_url} alt={link.platform} className="w-8 h-8 mr-4" />}
              <a href={link.url} className="text-blue-500 hover:underline">{link.title}</a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Save Customizations
        </button>
      </div>
    </div>
  );
};

export default LinkShow;
