import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateErrand extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeUrgency = this.onChangeUrgency.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      deadline: new Date(),
      location: '',
      difficulty: 'Too Easy',
      urgency: 'No time limit'
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDeadline(date) {
    this.setState({
      date: date
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    })
  }

  onChangeUrgency(e) {
    this.setState({
      urgency: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const errands = {
      username: this.props.auth.user.username,
      description: this.state.description,
      duration: this.state.duration,
      deadline: this.state.deadline,
      location: this.state.location,
      difficulty: this.state.difficulty,
      urgency: this.state.urgency,
    }

    console.log(errands);

    axios.post('/errands/add', errands)
      .then(res => console.log(res.data));

    window.location = '/errand';
  }

  render() {
    const { user } = this.props.auth;

    return (
    <div>
      <h3>Post A New Errand</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={ user ? `${user.username}` : '' }
              onChange={this.onChangeUsername}>
              <option>{ user ? `${user.username}` : '' }</option>
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Deadline: </label>
          <div>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.onChangeDeadline}
            />
          </div>
        </div>
        <div className="form-group"> 
          <label>Location: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>

        <div className="form-group"> 
          <label>Difficulty: </label>
          <select ref={this.inputRef}
              required
              className="form-control"
              value={this.state.difficulty}
              onChange={this.onChangeDifficulty}>
                <option value='Too Easy'>Too Easy</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Difficult">Difficult</option>
                <option value="Very Difficult">Very Difficult</option>
          </select>
        </div>

        <div className="form-group"> 
          <label>Urgency: </label>
          <select ref={this.inputRef}
              required
              className="form-control"
              value={this.state.urgency}
              onChange={this.onChangeUrgency}>
                <option value="No time limit">No time limit</option>
                <option value="Can Wait">Can Wait</option>
                <option value="Moderate">Moderate</option>
                <option value="Urgent">Urgent</option>
                <option value="Very Urgent">Very Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Errand Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(CreateErrand);