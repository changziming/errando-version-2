import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom';

class ErrandDetails extends Component {
  constructor(props) {
    super(props);

    this.deleteErrands = this.deleteErrands.bind(this);
    this.acceptErrand = this.acceptErrand.bind(this);
    this.completeErrand = this.completeErrand.bind(this);
    this.forfeitErrand = this.forfeitErrand.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.cancel = this.cancel.bind(this);

    this.state = { 
      errands: [],
      payload: [],
      status: '',
      acceptedBy: null,
      acceptedByUsername: '',
      confirm: false
     };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired
  }

  componentDidMount() {
    axios.get('/errands/'+this.props.match.params.id)
      .then(response => {
        this.setState({ errands: response.data })
        console.log(this.state.errands)
        if(response.data.acceptedBy !== null) {
          this.setState({ acceptedByUsername: response.data.acceptedBy.username })
        } else {
          this.setState({ acceptedByUsername: "null" })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    // verify a token symmetric
    const payload = jwt.decode(this.props.auth.token)
    this.setState({payload: payload})
  }

  deleteErrands(id) {
    axios.delete('/errands/'+id)
      .then(response => { console.log(response.data)});

    window.location = '/errand';
  }

  completeErrand() {
    this.setState({
      status: "Completed",
      acceptedBy: this.state.payload.id,
      confirm: true
    })
    console.log("Status is now `Completed`")
  }

  forfeitErrand() {
    this.setState({
      status: "Open",
      acceptedBy: null,
      confirm: true
    })
    console.log("Status is now `Open`")
  }

  acceptErrand() {
    this.setState({
      status: "Ongoing",
      acceptedBy: this.state.payload.id,
      confirm: true
    })
    console.log("Status is now `Ongoing`")
  }

  changeStatus(id) {

    const status = {
      status: this.state.status,
      acceptedBy: this.state.acceptedBy
    }

    axios.post('/errands/status/'+id, status)
      .then(response => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })

    window.location = '/details/'+this.props.match.params.id;
  }

  cancel() {
    this.setState({
      confirm: !this.state.confirm
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const editLinks = (
      <Fragment>
        <div style={{float:"right"}}>
          <Button className="mr-3" href={"/edit/"+this.state.errands._id}>edit</Button>
          <Button color="danger" onClick={() => { this.deleteErrands(this.state.errands._id) }}>delete</Button>
        </div>
      </Fragment>
    )

    const confirmButton = (
      <Fragment>
        <p>
          <Button color="info" onClick={() => {
            this.changeStatus(this.state.errands._id) }}>Confirm</Button>
          <Button color="info" className="ml-3" onClick={() => this.cancel()}>Cancel</Button>
        </p>
      </Fragment>
    )

    const openLink = (
      <Fragment>
        <p>
          <Button to="#" className="mr-3" color="primary" onClick={() => { this.acceptErrand() }}>Accept</Button>
        </p>
        { this.state.confirm ? confirmButton : null }
      </Fragment>
    )
 
    const ongoingLink = (
    
      <Fragment>
        <p>
          <Button to="#" className="mr-3" color="success" onClick={() => { this.completeErrand() }}>Complete</Button>
          <Button to="#" className="mr-3" color="danger" onClick={() => { this.forfeitErrand() }}>Forfeit</Button>
        </p>
        { this.state.confirm ? confirmButton : null }
      </Fragment>
    )

    return (
      <div>
        <div style={{float:"left"}}>
          <h3>Errand Detail</h3> 
        </div> 
        { isAuthenticated && this.state.errands.username === user.username ? editLinks : null }
        <br/>
        <div style={{clear:"left", marginTop:"3rem"}}>
          <p>
            <strong>Posted By: </strong><Link to={"/user/"+this.state.errands.username}>{this.state.errands.username}</Link>
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
            <strong>Remuneration: </strong>{this.state.errands.renumeration}
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
          <p>
            <strong>Status: </strong>{this.state.errands.status}
          </p>
          <br/>
          <p>
            <strong>Accepted By: </strong><Link to={"/user/"+this.state.acceptedByUsername}>{this.state.acceptedByUsername}</Link>
          </p>
          <br/>
        </div>
        { isAuthenticated && this.state.errands.username !== user.username && this.state.errands.status === "Open" ? openLink : null }
        { isAuthenticated && this.state.errands.status === "Ongoing" && this.state.errands.acceptedBy._id === user._id ? ongoingLink : null }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(ErrandDetails);