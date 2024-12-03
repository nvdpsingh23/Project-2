import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";

// Main App component that manages the application's routing and state
function App() {
  // State for storing pins, loading status, and potential errors
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pins from the server on component mount
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("http://34.70.249.43:8080/pins");
        setPins(response.data.items); // Access the `items` array
        setLoading(false);// Set loading to false after data is fetched
      } catch (err) {
        setError(err.message || "Failed to fetch pins");// Handle errors in fetching
        setLoading(false);// Ensure loading is set to false even if fetch fails
      }
    };

    fetchPins();// Call the fetch function
  }, []);// Empty dependency array means this effect runs only once after initial render

  return (
    <Router>
      <div className="App">
      {/* Include the Header component */}
        <Header />
        <main className="main-content">
          <Routes>
            {/*  Setup routes for different pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<Gallery pins={pins} />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </main>
        {/* Include the Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
