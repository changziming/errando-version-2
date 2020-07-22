import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Searchbox from './SearchBox';

function SearchBox(props){
    return(
            <div>
                <input onChange = {props.handleInput} type = "text"/>
            </div>
    )
}

export default SearchBox;