import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Header component for the Visionary Tales application
const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                {/* Wrap the logo in a Link */}
                <h1 className="logo">
                    <Link to="/" className="logo-link">Visionary Tales</Link>
                </h1>
                {/* Displays the links to different pages in the header */}
                <nav className="navbar">
                    <ul className="nav-list">
                        {/* Navigation item for the Home page */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        {/* Navigation item for the About page */}
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        {/* Navigation item for the Gallery page */}
                        <li className="nav-item">
                            <Link to="/gallery" className="nav-link">Gallery</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
