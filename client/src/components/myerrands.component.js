import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

const PostedErrands = props => (
  <tr>
    <td>{props.errands.description}</td>
    <td>{props.errands.deadline.substring(0,10)}</td>
    <td>{props.errands.location}</td>
    <td>{props.errands.status}</td>
    <td>
      <Link to={'/details/'+props.errands._id}>Details</Link>
    </td>
  </tr>
)

const AcceptedErrands = props => (
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

class MyErrands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errands: [],
      payload: []
      // postedErrands: [],
      // acceptedErrands: []
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount() {
    axios.get('/errands/')
      .then(response => {
        this.setState({ errands: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

    const payload = jwt.decode(this.props.auth.token)
    this.setState({payload: payload})
  }

  postedErrandsfilter = (errand) => {
    return errand.username === this.state.payload.username
  }

  acceptedErrandsfilter = (errand) => {
    return errand.acceptedBy === this.state.payload.id
  }

  postedErrandsList = () => {
    const filteredErrands = this.state.errands.filter(this.postedErrandsfilter)
    return filteredErrands.map(currenterrands => {
      return <PostedErrands errands={currenterrands} key={currenterrands._id}/>;
    })
  }

  acceptedErrandsList = () => {
    const filteredErrands = this.state.errands.filter(this.acceptedErrandsfilter)
    return filteredErrands.map(currenterrands => {
      return <AcceptedErrands errands={currenterrands} key={currenterrands._id}/>;
    })
  }

  render() {
   
    return (
      <div>
        <div>
          <h3>My Errands</h3>
        </div>
           
        <div>
          <h4>My Posted Errands</h4>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Description</th>
                <th>Deadline</th>
                <th>Location</th>
                <th>Status</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              { this.postedErrandsList() }
            </tbody>
          </table>
        </div>

        <div>
          <h4>My Accepted Errands</h4>
          <table className="table table-hover">
            <thead className="thead-light">
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
              { this.acceptedErrandsList() }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(MyErrands);