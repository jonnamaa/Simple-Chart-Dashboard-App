import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FieldBarchart from '../componenets/FieldBarchart';
import FieldLinechart from '../componenets/FieldLinechart';
import '../styles/App.css';
import { Link } from 'react-router-dom';

const FieldThreeInfo = () => {
  return (
    <Container>
        <Row className="top-row-style">
          <Link
              style={{
                  color: 'black', 
              }} 
              to={'/'}>
              <p><span>&laquo;</span>Takaisin</p>
          </Link>
        </Row>
        <Row className="row-style">
            <FieldBarchart fieldName="ruoka"/>
        </Row>
        <Row className="row-style">
            <FieldLinechart fieldName="ruoka"/>
        </Row>
    </Container>
  );
};

export default FieldThreeInfo;
