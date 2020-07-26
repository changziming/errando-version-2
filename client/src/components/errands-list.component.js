import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Searchbox from './SearchBox'

const Errands = props => (
  <tr>
    <td>{props.errands.username}</td>
    <td>{props.errands.description}</td>
    <td>{props.errands.deadline.substring(0,10)}</td>
    <td>{props.errands.location}</td>
    <td>{props.errands.status}</td>
    <td>
      <Link to={'/details/'+props.errands._id}>Details</Link>
    </td>
  </tr>
)

export default class ErrandsList extends Component {
  constructor(props) {
    super(props);

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


  errandsList() {
    return this.state.errands.map(currenterrands => {
      return <Errands errands={currenterrands} key={currenterrands._id}/>;
    })
  }

  handleInput = (e) => {
    this.setState({searchErrand :e.target.value})
  }

  render() {

   
    return (
      <div>
        <h3>Errands List</h3> 
        
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Posted By</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Location</th>
              <th>Status</th>
              <th>More Info</th>
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