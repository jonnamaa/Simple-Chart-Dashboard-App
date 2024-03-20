import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

const Navigationbar = () => {
  const location = useLocation(); 

  const renderNavbarText = () => {
    const path = location.pathname;

    if (path === '/') {
        return '';
      }

    // Map paths to corresponding navbar text
    const navbarTextMap = {
      '/': 'Dashboard',
      '/tunnelmainfo': ' >> Tunnelma',
      '/palveluinfo': ' >> Palvelu',
      '/ruokainfo': ' >> Ruoka',
    };

    // Render the corresponding text for the current path
    return navbarTextMap[path] || 'Dashboard';
   
  };
  
  return (
    <div>
        <Navbar expand="lg" className=""  style={{backgroundColor: '#F08A5D'}}>
        <Container>
            <Navbar.Brand href="/">Dashboard</Navbar.Brand>
            <Nav.Item className="ml-auto">{renderNavbarText()}</Nav.Item>
        </Container>
        </Navbar>
    </div>
  );
};

export default Navigationbar;
