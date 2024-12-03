import React from 'react'; // Import React to enable JSX syntax and React features
import ReactDOM from 'react-dom'; // Import ReactDOM for DOM-specific methods
import './App.css'; // Import the main stylesheet for the application
import App from './App'; // Import the App component from the local file

ReactDOM.render(
  //  React.StrictMode is a tool for highlighting potential problems in an application
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // Target the DOM element with id 'root' as the mount point
    document.getElementById('root')
);
