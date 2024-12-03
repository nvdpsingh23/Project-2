import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import backgroundImage from '../images/img1.jpg'; // Import background image

const Home = () => {
    return (
        <div
            className="home-container"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Apply the background image
                backgroundSize: 'cover',// Ensure the background covers the entire container
                backgroundPosition: 'center',// Center the background image
                backgroundRepeat: 'no-repeat',// Prevent the background image from repeating
                height: '100vh',// Full viewport height
                color: 'white',// Set text color to white for contrast
                display: 'flex',// Use flexbox for layout
                flexDirection: 'column',// Stack children vertically
                justifyContent: 'center',// Center children vertically in the container
                alignItems: 'center',// Center children horizontally
                textAlign: 'center',// Align text centrally
                padding: '20px',// Add padding around the content
            }}
        >
            <h1 className="home-title">Welcome to Visionary Tales</h1>
            <p className="home-description">
                Dive into the world of storytelling! Upload your images in pinterest and let our AI weave them into visionary tales.
            </p>    
            {/* Description text explaining the site's purpose */}
            <Link to="/gallery" className="get-started-btn">
               {/* Button to guide users to start using the application */}
                Get Started
            </Link>
        </div>
    );
};

export default Home;
