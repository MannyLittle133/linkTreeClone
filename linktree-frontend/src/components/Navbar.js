import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerDropdown from './HamburgerDropdown';
import axios from '../axiosConfig';

const Navbar = ({ user, onLogout, onDemoLogin }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.delete('/users/sign_out');
      onLogout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/LinkyLogo.png" alt="Linky Link" className="h-8 w-8 mr-2" />
          <div className="text-white font-bold text-xl">Linky Link</div>
        </Link>
        <div className="relative">
          {user ? (
            <>
              <Link to="/links" className="text-white mr-4">My Links</Link>
              <div className="relative inline-block text-left">
                <button onClick={toggleDropdown} className="flex items-center text-white">
                  <img src="/profilePlaceholder.jpg" alt="User" className="h-6 w-6 rounded-full mr-2" />
                  <span className="text-sm">{user.name}</span>
                </button>
                {dropdownVisible && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                    </div>
                  </div>
                )}
              </div>
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
