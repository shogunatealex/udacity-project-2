import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollCardList from './PollCardList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Redirect } from 'react-router-dom';


class PollSummary extends Component {
    render() {
        const { unansweredQuestions, answeredQuestions, authedUser } = this.props;

        if(!authedUser){
          return (
              <Redirect 
              to={{
                  pathname:"/login",
                  state: { from: this.props.location }}} />
          )
      }
        
        return (
            <Tabs style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
            <TabList>
              <Tab>Unanswered Questions</Tab>
              <Tab>Answered Questions</Tab>
            </TabList>
         
            <TabPanel>
                <PollCardList questionIds={unansweredQuestions} />
            </TabPanel>
            <TabPanel>
                <PollCardList questionIds={answeredQuestions} />
            </TabPanel>
          </Tabs>
        );
      }
}

function mapStateToProps ({questions, authedUser}) {
    return {
      authedUser,
      unansweredQuestions: Object.keys(questions)
          .filter((id) => questions[id].optionOne.votes.indexOf(authedUser) === -1 && questions[id].optionTwo.votes.indexOf(authedUser) === -1)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      answeredQuestions: Object.keys(questions)
          .filter((id) => questions[id].optionOne.votes.indexOf(authedUser) !== -1 || questions[id].optionTwo.votes.indexOf(authedUser) !== -1)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    }
  }
  
  export default connect(mapStateToProps)(PollSummary);