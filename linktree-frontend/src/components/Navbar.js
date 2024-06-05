import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerDropdown from './HamburgerDropdown';

const Navbar = ({ user, onLogout }) => {
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
              <button onClick={onLogout} className="text-white bg-red-500 px-3 py-2 rounded">Logout</button>
            </>
          ) : (
            <HamburgerDropdown />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
