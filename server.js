const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const vision = require('@google-cloud/vision');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, query, where, getDocs } = require('firebase/firestore');

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHrsmzHkH0nszSOs53vewQ7H1OpTdKW3Y",
    authDomain: "visionary-tales.firebaseapp.com",
    projectId: "visionary-tales",
    storageBucket: "visionary-tales.firebasestorage.app",
    messagingSenderId: "681639002358",
    appId: "1:681639002358:web:503dac7dca0fab6a632cd7",
    measurementId: "G-PDK07J0147",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());


const PORT = 8080;

// Google Vision API Client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, 'river-autumn-434523-e1-8821ec4f6a3f.json'),
});

// Gemini API Setup
const GEMINI_API_KEY = 'AIzaSyDMCKdEpNzErf457HsdEiqwdsDbsc2KPIQ';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Endpoint to fetch pins
app.get('/pins', async (req, res) => {
    try {
        const apiURL = 'https://api.pinterest.com/v5/boards/1066790299173551119/pins';
        const token = 'pina_AMAUWAYXAAVNYAYAGAAM4DV57YSYVEYBQBIQCQJ2BKY7BG53NUXJC3GA7YUTYAGGWIDOKEBAKC2QP3C44SMQKRWZ65THYSQA';

        console.log('Fetching pins from Pinterest API...');
        const response = await axios.get(apiURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Pinterest API response:', JSON.stringify(response.data, null, 2));

        if (response.status === 200 && response.data) {
            res.json(response.data);
        } else {
            res.status(500).json({ error: 'Unexpected API response', response: response.data });
        }
    } catch (error) {
        console.error('Error fetching pins:', error.message);

        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
        }

        res.status(500).send('Error fetching data from Pinterest API');
    }
});

// Endpoint to analyze an image and generate a story
app.post('/analyze-image', async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        console.log('Analyzing image URL:', imageUrl);

        // Check if the image already exists in Firestore
        const talesCollection = collection(db, 'visionaryTales');
        const existingQuery = query(talesCollection, where('imageUrl', '==', imageUrl));
        const querySnapshot = await getDocs(existingQuery);

        if (!querySnapshot.empty) {
            // Return the existing document
            const existingData = querySnapshot.docs[0].data();
            console.log('Image already analyzed. Returning existing data:', existingData);
            return res.json({ ...existingData, docId: querySnapshot.docs[0].id });
        }

        // Analyze image with Google Vision API
        const [result] = await client.labelDetection(imageUrl);
        const labels = result.labelAnnotations.map((label) => label.description);

        console.log('Extracted labels:', labels);

        // Generate story using Gemini API
        let story = 'Failed to generate story.';
        try {
            const storyPrompt = `Write a short 4 lines creative story inspired by the following labels: ${labels.join(', ')}.`;

            const geminiResponse = await model.generateContent(storyPrompt);
            story = geminiResponse.response.text() || 'Failed to generate story.';
            console.log('Generated story:', story);
        } catch (storyError) {
            console.error('Error generating story:', storyError.message);
        }

        // Save to Firebase
        const docRef = await addDoc(talesCollection, {
            imageUrl,
            labels,
            story,
            timestamp: new Date(),
        });

        console.log('Document written with ID:', docRef.id);

        res.json({ labels, story, docId: docRef.id });
    } catch (error) {
        console.error('Error analyzing image:', error.message);

        if (error.response) {
            console.error('Error response data:', error.response.data);
        }

        if (error.response && error.response.status === 401) {
            res.status(401).json({ error: 'Invalid Gemini API key. Check your credentials.' });
        } else if (error.code === 7) {
            res.status(403).json({ error: 'Permission denied. Check your Google Vision API key.' });
        } else if (error.code === 8) {
            res.status(400).json({ error: 'Invalid image URL or unsupported format.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
