import React, {useState} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import DragNDrop from './components/DragNDrop';
import DataView from "./view/data-view";

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <div className="o-container">
        <DataView />
      </div>
    </div>
  );
}

export default App;
