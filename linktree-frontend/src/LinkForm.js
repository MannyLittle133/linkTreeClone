import React, { useState } from 'react';
import axios from 'axios';

const LinkForm = ({ userId, link, onSuccess }) => {
  const [title, setTitle] = useState(link ? link.title : '');
  const [url, setUrl] = useState(link ? link.url : '');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = link
        ? await axios.put(`/users/${userId}/links/${link.id}`, { title, url })
        : await axios.post(`/users/${userId}/links`, { title, url });
      onSuccess(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {error && <p>{error.message}</p>}
      <button type="submit">{link ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default LinkForm;
