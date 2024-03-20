import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barchart from '../componenets/Barchart';
import ReviewList from '../componenets/Reviewlist';
import FieldPiechart from '../componenets/FieldPiechart';
import TotalComponent from '../componenets/TotalComponent';
import ReviewCountInTimeline from '../componenets/ReviewCountInTimeline';
import CompareLinechart from '../componenets/CompareLinechart';
import '../styles/App.css';

const Home = () => {
  return (
    <Container>
        <Row className="row-style">
            <Col md={8}>
                <Barchart/>
            </Col>
            <Col md={4}>
                <TotalComponent/>
            </Col>
        </Row>
        <Row className="row-style">
            <Col sm={12} md={4}>
                <FieldPiechart fieldName="tunnelma" targetPage="fieldtwoinfo" />
            </Col>
            <Col sm={12} md={4}>
                <FieldPiechart fieldName="palvelu" targetPage="fieldoneinfo"/>
            </Col>
            <Col sm={12} md={4}>
                <FieldPiechart fieldName="ruoka" targetPage="fieldthreeinfo" />
            </Col>
        </Row>
        <Row className="row-style">
            <CompareLinechart/>
        </Row>
        <Row className="row-style">
            <ReviewCountInTimeline/>
        </Row>
        <Row className="row-style">
            <ReviewList/>
        </Row>
    </Container>
  );
};

export default Home;
