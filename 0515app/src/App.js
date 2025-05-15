import React from 'react';
import Counter from './components/Counter';
import MyText from './components/MyText';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="app-nav">
        <button className="nav-button">Home</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Events</button>
        <button className="nav-button">MyText</button>
        <button className="nav-button">Contact</button>
        <button className="nav-button">UseMemo</button>
        <button className="nav-button">Counter</button>
      </nav>
      
      <div className="app-content">
        <div className="component-container">
          <h2 className="component-title">計數器</h2>
          <Counter />
        </div>
        
        <div className="component-container">
          <h2 className="component-title">文字編輯器</h2>
          <MyText />
        </div>
      </div>
    </div>
  );
}

export default App;
