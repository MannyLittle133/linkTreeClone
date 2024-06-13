import React, { useState } from 'react';
import axios from 'axios';

const LinkForm = ({ userId, link, onSuccess }) => {
  const [title, setTitle] = useState(link ? link.title : '');
  const [url, setUrl] = useState(link ? link.url : '');
  const [platform, setPlatform] = useState(link ? link.platform : '');
  const [error, setError] = useState(null);

  const SOCIAL_MEDIA_LOGOS = {
    'Facebook': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-1024.png',
    'Twitter': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png',
    'Instagram': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-1024.png',
    'Linkedin': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-1024.png',
    'Youtube': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-1024.png',
    'Tiktok': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tiktok_colored_svg-1024.png',
    'snapchat': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Snapchat_colored_svg-1024.png',
    'Pinterest': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-1024.png',
    'Twitch': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitch_colored_svg-1024.png',
    'Whatsapp': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-1024.png',
    'Telegram': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Telegram_colored_svg-1024.png',
    'Reddit': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Reddit_colored_svg-1024.png',
    'Discord': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Discord_colored_svg-1024.png',
    'Medium': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Medium_colored_svg-1024.png',
    'Tumblr': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tumblr_colored_svg-1024.png',
    'Github': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Github_colored_svg-1024.png',
    'Stackoverflow': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Stack_Overflow_colored_svg-1024.png',
    'Behance': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Behance_colored_svg-1024.png',
    'Dribbble': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Dribbble_colored_svg-1024.png',
    'Vimeo': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Vimeo_colored_svg-1024.png',
    'Soundcloud': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Soundcloud_colored_svg-1024.png',
    'Spotify': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Spotify_colored_svg-1024.png',
    'Apple': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Apple_colored_svg-1024.png',
    'Google': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Google_colored_svg-1024.png',
    'Microsoft': 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Microsoft_colored_svg-1024.png'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const logoUrl = SOCIAL_MEDIA_LOGOS[platform];
      const response = link
        ? await axios.put(`/users/${userId}/links/${link.id}`, { title, url, platform, logo_url: logoUrl })
        : await axios.post(`/users/${userId}/links`, { title, url, platform, logo_url: logoUrl });
      onSuccess(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Platform</option>
          {Object.keys(SOCIAL_MEDIA_LOGOS).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {link ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default LinkForm;
