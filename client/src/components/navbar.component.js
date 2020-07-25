import React, { Component, Fragment } from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Navibar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{ user ? `Welcome ${user.username}` : '' }</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout/>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal/>
        </NavItem>
        <NavItem>
          <LoginModal/>
        </NavItem>  
      </Fragment>
    );

    const postLink = (
      <Fragment>
        <NavLink href="/create" className="mr-auto" style={{color: "white"}}>Post Errands</NavLink>
        { user ? <NavLink href={"/myerrands/"+user._id} className="mr-auto" style={{color: "white"}}>My Errands</NavLink> : null }
      </Fragment>
    )

    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand href="/">errando</NavbarBrand>
          <Nav className="mr-auto">
            <NavLink href="/errand" style={{color: "white"}}>Errands</NavLink>
            { isAuthenticated ? postLink : null }
          </Nav>
          
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Navibar);
