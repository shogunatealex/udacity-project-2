import React, { Component } from 'react'
import logo from './logo.svg';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import './App.css';
import PollSummary from './PollSummary';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <PollSummary />
    );
  }

}


export default connect()(App);
