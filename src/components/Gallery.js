import React, { useState } from 'react';
import './Gallery.css';//Importing the css file
import axios from 'axios';

function Gallery({ pins }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [labels, setLabels] = useState([]);
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);
    // Code to fetch the pins and relevant data from backend
    const openPopup = async (imageUrl) => {
        setSelectedImage(imageUrl);
        setLabels([]);
        setStory('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/analyze-image', {
                imageUrl,
            });

            setLabels(response.data.labels);
            setStory(response.data.story);
        } catch (error) {
            console.error('Error fetching labels and story:', error.message);
            setLabels(['Failed to fetch labels']);
            setStory('Failed to generate story.');
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setSelectedImage(null);
        setLabels([]);
        setStory('');
    };
    // Code to Render the images in the page
    return (
        <div>
            <div className="gallery">
                {pins.map((pin) => (
                    <div
                        key={pin.id}
                        className="pin-card"
                        onClick={() => openPopup(pin.media?.images['600x']?.url || pin.media?.images['150x150']?.url)}
                    >
                        <img
                            src={pin.media?.images['600x']?.url || pin.media?.images['150x150']?.url}
                            alt="Pinterest Pin"
                            className="pin-image"
                        />
                    </div>
                ))}
            </div>
            {/* Code for the popup */}
            {selectedImage && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup} aria-label="Close Popup">
                            &times;
                        </button>
                        <img src={selectedImage} alt="Selected Pin" className="popup-image" />
                        <div className="labels">
                            {loading ? (
                                <p>Loading labels and story...</p>
                            ) : (
                                <>
                                {/* Code for displaying the labels */}
                                    <h3>Labels:</h3>
                                    <ul>
                                        {labels.map((label, index) => (
                                            <li key={index}>{label}</li>
                                        ))}
                                    </ul>
                                    <h3>Story:</h3>
                                    <p>{story}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
