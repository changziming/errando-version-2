import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Searchbox from './SearchBox';

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
      status: '',
      acceptedBy: null,
      confirm: false
     };
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

  completeErrand() {
    this.setState({
      status: "Completed",
      acceptedBy: this.props.auth.user.id,
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
      acceptedBy: this.props.auth.user.id,
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
          <Button color="info" className="ml-5" onClick={() => {
            this.changeStatus(this.state.errands._id) }}>Confirm</Button>
          <Button color="info" className="ml-3" onClick={() => this.cancel()}>Cancel</Button>
        </p>
      </Fragment>
    )

    const statusLinks = (
      <Fragment>
        <p>
          { this.state.errands.status === "Open" ? <Button to="#" className="mr-3" color="primary" onClick={() => { this.acceptErrand() }}>Accept</Button> : null }
          { this.state.errands.status === "Ongoing" ? <Button to="#" className="mr-3" color="success" onClick={() => { this.completeErrand() }}>Complete</Button> : null }
          { this.state.errands.status === "Ongoing" ? <Button to="#" className="mr-3" color="danger" onClick={() => { this.forfeitErrand() }}>Forfeit</Button> : null }
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
          <p>
            <strong>Status: </strong>{this.state.errands.status}
          </p>
          <br/>
          <Searchbox/>
        </div>
        { isAuthenticated && this.state.errands.username !== user.username ? statusLinks : null }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(ErrandDetails);