import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      username: '',
      phoneNumber: '',
      telegramHandle: ''
     };
  }

  componentDidMount() {
    axios.get('/users/?username='+this.props.match.params.id)
      .then(response => {
        this.setState({ 
          username: response.data.username,
          phoneNumber: response.data.phoneNumber,
          telegramHandle: response.data.telegramHandle
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    //const { isAuthenticated, user } = this.props.auth;


    //Create an edit user link
    // const editLinks = (
    //   <Fragment>
    //     <div style={{float:"right"}}>
    //       <Button className="mr-3" href={"/edit/"+this.state.errands._id}>edit</Button>
    //       <Button color="danger" onClick={() => { this.deleteErrands(this.state.errands._id) }}>delete</Button>
    //     </div>
    //   </Fragment>
    // )

    return (
      <div>
        <h3>User Detail</h3> 
        <br/>
          <p>
            <strong>Username: </strong>{this.state.username}
          </p>
          <br/>
          <p>
            <strong>Phone Number: </strong>{this.state.phoneNumber}
          </p>
          <br/>
          <p>
            <strong>Telegram Handle: </strong>{this.state.telegramHandle}
          </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, null)(UserDetails);