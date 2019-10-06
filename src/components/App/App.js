import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from '../Home/Home';
import Journal from '../Journal/Journal';
import Schedule from '../Schedule/Schedule';
import Reminders from '../Reminders/Reminders';
import Account from '../Account/Account';
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
            <Nav.Link as={NavLink} to="/account">Account</Nav.Link>
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
        <Route path="/account" component={Account} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
