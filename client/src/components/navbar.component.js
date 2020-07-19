import React, { Component, useState } from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

//export default class Navbar extends Component {
const Navibar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/">errando</NavbarBrand>
        <Nav className="mr-auto">
          <NavLink href="/errand" style={{color: "white"}}>Errands</NavLink>
          <NavLink href="/create" style={{color: "white"}}>Post Errands</NavLink>
        </Nav>
        
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <RegisterModal/>
            </NavItem>
            <NavItem>
              <LoginModal/>
            </NavItem>            
            <NavItem>
              <Logout/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navibar;
