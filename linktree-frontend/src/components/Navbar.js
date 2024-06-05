import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerDropdown from './HamburgerDropdown';
import axios from '../axiosConfig';

const Navbar = ({ user, onLogout, onDemoLogin }) => {
  const handleLogout = async () => {
    try {
      await axios.delete('/users/sign_out');
      onLogout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/LinkyLogo.png" alt="Linky Link" className="h-8 w-8 mr-2" />
          <div className="text-white font-bold text-xl">Linky Link</div>
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/links" className="text-white mr-4">My Links</Link>
              <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <HamburgerDropdown />
              <button onClick={onDemoLogin} className="text-white bg-green-500 px-3 py-2 rounded ml-4">Demo Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;