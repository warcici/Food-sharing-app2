import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          LOGO
        </Link>
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">Mon Compte</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
