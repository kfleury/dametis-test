import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ColorPicker.css'
import { isValidColor } from '../../lib/useful'

type IColorPickerProps = {
    color: string;
    onColorChange: (color: string) => void;
    colors?: string[];
}

const ColorPicker: React.FC<IColorPickerProps> = ({color, onColorChange, colors}) => {
    const [showDiv, setShowDiv] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [newColor, setNewColor] = useState('')
    const [colorsOption, setColorsOption] = useState(colors || ['red', 'blue', 'green'])
    const numCols = useMemo(() => Math.ceil(Math.sqrt(colorsOption.length)), [colorsOption.length])

    useEffect(() => {
        if (colors) {
            setColorsOption(colors)
            onColorChange(colors[0])
        }
    }, [colors, onColorChange])

    const toggleDiv = useCallback(() => {
        setShowDiv(prevShowDiv => !prevShowDiv)
        setIsValid(true)
    }, [])

    const handleColorChange = useCallback((newColor: string) => {
        onColorChange(newColor)
        toggleDiv()
    }, [onColorChange, toggleDiv])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return
        }
        if (isValidColor(newColor)) {
            setColorsOption(prevColorsOption => [...prevColorsOption, newColor])
            onColorChange(newColor)
            setNewColor('')
            setIsValid(true)
        } else {
            setIsValid(false)
        }    
    }, [newColor, onColorChange])

    return (
        <div>
            <div className="color-picker-input-container">
            <InputGroup className='color-picker-input-group'>
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
                className="color-picker-input"
                    type="text" 
                    placeholder="Nouvelle couleur"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = 'black'}
                    onBlur={(e) => e.target.style.borderColor = ''}
                    onKeyDown={handleKeyDown}
                />
                </InputGroup>
                {!isValid && <div className="color-picker-error">{'La couleur n\'est pas valide.'}</div>}
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
    )
}

export default ColorPicker
