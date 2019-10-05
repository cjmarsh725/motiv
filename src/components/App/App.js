import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Home from '../Home/Home';
import Journal from '../Journal/Journal';
import Schedule from '../Schedule/Schedule';
import Reminders from '../Reminders/Reminders';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import './App.css';

/*
Entry point of the application, contains the header navbar along with the 
routes and their components.
*/
function App() {
  return (
    <Router>
      <Navbar className="app-navbar" expand="sm" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/journal">Journal</Nav.Link>
            <Nav.Link as={NavLink} to="/schedule">Schedule</Nav.Link>
            <Nav.Link as={NavLink} to="/reminders">Reminders</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-custom-1">Pow! Zoom!</Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                  Active Item
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
          <span style={{color: "skyblue"}}>M</span>otiv
        </Navbar.Brand>
      </Navbar>
      <div className="app no-select">
        <Route path="/" exact component={Home} />
        <Route path="/journal" component={Journal} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/reminders" component={Reminders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
