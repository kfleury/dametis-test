import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ColorPicker.css'

type IColorPicker = {
    color: string;
    onColorChange: (color: string) => void;
    colors: string[];
}

function isValidColor(color: string): boolean {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (hexRegex.test(color)) {
      return true;
    }
    const predefinedColors = [
      'transparent', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 
      'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'pink'
    ];
    if (predefinedColors.includes(color.toLowerCase())) {
      return true;
    }
    return false;
}

const ColorPicker: React.FC<IColorPicker> = ({color, onColorChange, colors}) => {
    const [showDiv, setShowDiv] = useState(false)
    const [newColor, setNewColor] = useState('')
    const [colorsOption, setColorsOption] = useState(colors)
    const [isValid, setIsValid] = useState(true);
    const numCols = Math.ceil(Math.sqrt(colorsOption.length));

    const toggleDiv = () => {
      setShowDiv(!showDiv);
      setIsValid(true);
    };
  
    const handleColorChange = (newColor: string) => {
      onColorChange(newColor);
      toggleDiv();
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (isValidColor(newColor)) {
                setColorsOption([...colorsOption, newColor]);
                onColorChange(newColor)
                setNewColor('')
                setIsValid(true);
            } else {
                setIsValid(false)
            }    
        }

      };

  return (
    <div className='color-picker-container'>
      <div className="color-picker-input-container">
        <Button 
          onClick={toggleDiv}
          style={{ 
            backgroundColor: color, 
            borderColor: color,
          }}
          className="color-picker-button"
        >
        </Button>
        <Form.Control
          type="text" 
          placeholder="Nouvelle couleur"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          onKeyPress={handleKeyPress}
          className="color-picker-input"
        />
        {!isValid && <div className="color-picker-error">La couleur n'est pas valide.</div>}
      </div>
      {showDiv && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 40px)`, gap: '10px' }}>
          {colorsOption.map((color, index) => (
            <button 
              key={index} 
              style={{ backgroundColor: color, width: '40px', height: '40px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
