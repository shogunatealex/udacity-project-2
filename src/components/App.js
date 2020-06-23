import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import './App.css';
import PollSummary from './PollSummary';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import { LoadingBar } from 'react-redux-loading';
import Logout from './Logout';
import Login from './Login';
import QuestionInfo from './QuestionInfo';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav/>
          <LoadingBar />
          {this.props.loading === true
            ? null
            : <div>
                <Route path='/' exact component={PollSummary} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/logout' component={Logout} />
                <Route path='/login' component={Login} />
                <Route path='/question/:questionId' component={QuestionInfo} />
              </div>}
        </Fragment>
      </Router>


    );
  }

}

export default connect()(App);
