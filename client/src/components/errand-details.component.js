import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ErrandDetails extends Component {
  constructor(props) {
    super(props);

    this.deleteErrands = this.deleteErrands.bind(this)

    this.state = {errands: []};
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount() {
    axios.get('/errands/'+this.props.match.params.id)
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

    window.location = '/errand';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const editLinks = (
      <Fragment>
        <p>
          <Link to={"/edit/"+this.state.errands._id}>edit</Link>
        </p>
        <p>
          <Link to="#" onClick={() => { this.deleteErrands(this.state.errands._id) }}>delete</Link>
        </p>
      </Fragment>
    )

    return (
      <div>
        <h3>Errand Detail</h3>
        <br/>
        <p>
          <strong>Posted By: </strong>{this.state.errands.username}
        </p>
        <br/>
        <p>
          <strong>Description: </strong>{this.state.errands.description}
        </p>
        <br/>
        <p>
          <strong>Duration: </strong>{this.state.errands.duration}
        </p>
        <br/>
        <p>
          <strong>Deadline: </strong>{this.state.errands.deadline}
        </p>
        <br/>
        <p>
          <strong>Location: </strong>{this.state.errands.location}
        </p>
        <br/>
        <p>
          <strong>Difficulty: </strong>{this.state.errands.difficulty}
        </p>
        <br/>
        <p>
          <strong>Urgency: </strong>{this.state.errands.urgency}
        </p>
        <br/>
        { isAuthenticated && this.state.errands.username === user.username ? editLinks : null }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(ErrandDetails);