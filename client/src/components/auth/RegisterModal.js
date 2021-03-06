import React, { Component, useState, useCallback, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    username: '',
    email: '',
    phoneNumber: '',
    telegramHandle: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();

    const {username, email, phoneNumber, telegramHandle, password} = this.state;

    // Create User object
    const newUser = {
      username,
      email,
      phoneNumber,
      telegramHandle,
      password
    };

    // Attempt to register
    this.props.register(newUser);

    // Close modal
    //this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="phoneNumber">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="telegramHandle">Telegram Handle</Label>
                <Input
                  type="text"
                  name="telegramHandle"
                  id="telegramHandle"
                  placeholder="Eg. @JohnDoe56"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Register
                </Button>

              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect( mapStateToProps, { register, clearErrors })(RegisterModal);