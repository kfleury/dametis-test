import React, { useState } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';

function App() {
  const [color, setColor] = useState('red')

  return (
    <div className="App">
      <ColorPicker color={color} onColorChange={setColor} colors={['red', 'blue', 'green']} />
    </div>
  );
}

export default App;
