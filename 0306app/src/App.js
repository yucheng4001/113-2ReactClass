/*  WEEK2 (0306)
import './App.css';
import React, { useState, useEffect } from 'react';

function MyClock(props) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Hello, world</h1>
      <h2>It is {currentTime}.</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>1</h1>
      <MyClock />
    </div>
  );
}

export default App;
*/

import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App(){
  return (
    <div><Gallery/><Profile/></div>
  );
}