import React from 'react'
import {
    Container,
    Card,
    Row,
    Col,
    Image,
    Button,
    ThemeProvider,
    FloatingLabel,
    Accordion,
  } from "react-bootstrap";
import PdfToText from "../components/PdfToText.jsx";
import ImageToText from "../components/ImageToText.jsx";

export const Flask = ()=> {
  return (
    
    <Container className="mt-4" style={{textAlign: 'center'}}>
        <Row>
            <Col>
            <PdfToText/>
            </Col>
            <Col>
            {/* <ImageToText/> */}
            </Col>
        </Row>
    </Container>
  )
}
