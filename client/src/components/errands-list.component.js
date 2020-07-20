import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Errands = props => (
  <tr>
    <td>{props.errands.username}</td>
    <td>{props.errands.description}</td>
    <td>{props.errands.duration}</td>
    <td>{props.errands.deadline.substring(0,10)}</td>
    <td>{props.errands.location}</td>
    <td>{props.errands.difficulty}</td>
    <td>{props.errands.urgency}</td>
    <td>
      <Link to={'/details/'+props.errands._id}>Details</Link>
    </td>
  </tr>
)

export default class ErrandsList extends Component {
  constructor(props) {
    super(props);

    this.deleteErrands = this.deleteErrands.bind(this)

    this.state = {errands: []};
  }

  componentDidMount() {
    axios.get('/errands/')
      .then(response => {
        this.setState({ errands: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteErrands(id) {
    axios.delete('/errands/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      errands: this.state.errands.filter(el => el._id !== id)
    })
  }

  errandsList() {
    return this.state.errands.map(currenterrands => {
      return <Errands errands={currenterrands} deleteErrands={this.deleteErrands} key={currenterrands._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Errands List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Deadline</th>
              <th>Location</th>
              <th>Difficulty</th>
              <th>Urgency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.errandsList() }
          </tbody>
        </table>
      </div>
    )
  }
}