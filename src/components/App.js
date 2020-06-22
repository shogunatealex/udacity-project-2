import React, { Component, Fragment } from 'react'
import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import './App.css';
import PollSummary from './PollSummary';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav/>
          {this.props.loading === true
            ? null
            : <div>
                <Route path='/' exact component={PollSummary} />
                {/* <Route path='/tweet/:id' component={TweetPage} /> */}
                <Route path='/new' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/profile' component={null} />
                <Route path='/logout' component={null} />
              </div>}
        </Fragment>
      </Router>


    );
  }

}


export default connect()(App);
