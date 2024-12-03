import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Quick Links Section */}
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="footer-section">
                    <h3 className="footer-heading">Contact Us</h3>
                    <p>Email: contact@visionarytales.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>

                {/* Follow Us Section */}
                <div className="footer-section">
                    <h3 className="footer-heading">Follow Us</h3>
                    <ul className="footer-socials">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
                {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© 2024 Visionary Tales | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
