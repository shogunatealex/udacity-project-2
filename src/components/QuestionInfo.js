import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnswerQuestion from './AnswerQuestion';
import QuestionResults from './QuestionResults';
import { Redirect } from 'react-router-dom';


class QuestionInfo extends Component {
    render() {
        const { users, id, authedUser, questions} = this.props;
        if(!authedUser){
            console.log(this.props.location);
            return (
                <Redirect 
                to={{
                    pathname:"/login",
                    state: { from: this.props.location }}} />
            )
        }
        if(id in questions){
            if(id in users[authedUser].answers){
                return (
                    <QuestionResults questionId={id}/>
                )
            }
            return (
                <AnswerQuestion questionId={id}/>
            )
        }
        else{
            return (
                <h1 style={{textAlign:"center"}}>404 Poll Not Found</h1>
            )
        }

    }
}


function mapStateToProps({ users, authedUser, questions }, props) {
    const { questionId } = props.match.params
    return {
        questions,
        authedUser,
        id: questionId,
        users
    }
}


export default connect(mapStateToProps)(QuestionInfo)