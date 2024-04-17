import React, { useState } from 'react'
import ColorPicker from '../component/ColorPicker/ColorPicker'
import { Button, Col, Container, Row } from 'react-bootstrap'

const HomeView: React.FC = () => {
    const [color, setColor] = useState('red')
    const [colors, setColors] = useState(['red', 'pink', 'grey'])

    const handleChangeColors = (colors: string[]) => {
        setColors(colors)
    }

    return (
        <Container style={{marginTop: '20px'}}>
            <Row>
                <Col>
                    <Button onClick={() => handleChangeColors(['red', 'pink', 'grey'])}>oui</Button>
                </Col>
                <Col>
                    <Button onClick={() => handleChangeColors(['purple', 'green', 'blue'])}>non</Button>
                </Col>
            </Row>
            <Row>
                <Col>        
                    <ColorPicker color={color} onColorChange={setColor} colors={colors} />
                </Col>
            </Row>
        </Container>
    )
}

export default HomeView