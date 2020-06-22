import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollCardList from './PollCardList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class PollSummary extends Component {
    render() {
        const { unansweredQuestions, answeredQuestions } = this.props;
        console.log(unansweredQuestions.length, answeredQuestions);
        
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

function mapStateToProps ({questions}) {
    return {
      unansweredQuestions: Object.keys(questions)
          .filter((id) => questions[id].optionOne.votes.length === 0 && questions[id].optionTwo.votes.length === 0)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      answeredQuestions: Object.keys(questions)
          .filter((id) => questions[id].optionOne.votes.length !== 0 || questions[id].optionTwo.votes.length !== 0)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    }
  }
  
  export default connect(mapStateToProps)(PollSummary);