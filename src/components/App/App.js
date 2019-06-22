import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from '../Home/Home';
import Journal from '../Journal/Journal';
import Schedule from '../Schedule/Schedule';
import Reminders from '../Reminders/Reminders';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar expand="sm" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/journal">
                Journal
              </Nav.Link>
              <Nav.Link as={NavLink} to="/schedule">
                Schedule
              </Nav.Link>
              <Nav.Link as={NavLink} to="/reminders">
                Reminders
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand><span style={{color: "skyblue"}}>
            M</span>otiv
          </Navbar.Brand>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/journal" component={Journal} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/reminders" component={Reminders} />
      </div>
    </Router>
  );
}

export default App;
