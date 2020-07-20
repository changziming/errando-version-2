import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Navibar from "./components/navbar.component";
import ErrandsList from "./components/errands-list.component";
import EditErrand from "./components/edit-errand.component";
import ErrandDetails from "./components/errand-details.component";
import CreateErrand from "./components/create-errand.component";
import CreateUser from "./components/create-user.component";
import Homepage from "./components/homepage.component";

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
          <Navibar />
          </div>
          <div>
          <Route path="/" exact component={Homepage} />
          </div>
          <br/>
          <div className="container">
          <Route path="/errand" component={ErrandsList} />
          <Route path="/edit/:id" component={EditErrand} />
          <Route path="/details/:id" component={ErrandDetails} />
          <Route path="/create" component={CreateErrand} />
          <Route path="/user" component={CreateUser} />
          </div>
        </Router>
      </Provider>
    );
  }
}

