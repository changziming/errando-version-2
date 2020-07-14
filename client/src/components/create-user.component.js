import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      message: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    
    // validate email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!this.state.email.match(mailformat)) {
      console.log("You have entered an invalid email address!");
      this.setState({ email: '', message: "You have entered an invalid email address!"})
      return
    }

    // validate phone number
    if (!this.state.phoneNumber.match(/^[0-9]+$/) && this.state.phoneNumber.length !== 8) {
      console.log("You have entered an invalid phone number!");
      this.setState({ phoneNumber: '', message: "You have entered an invalid phone number!"})
      return
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    }

    console.log(user);

    axios.post('/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      message: 'User created!'
    })
  }

  render() {
    return (
      <div>
        <h2 className='container' style={{'color': '#f44336'}} >{this.state.message}</h2>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Phone Number: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}