import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./PollCard.css";
import { Redirect } from 'react-router-dom';
const images = require.context('../img', true);


class QuestionResults extends Component {

    state = {
        option: ""
    }



    render() {
        const { id ,questions, users, authedUser } = this.props;
        if(!authedUser){
            console.log(this.props.location);
            return (
                <Redirect 
                to={{
                    pathname:"/login",
                    state: { from: this.props.location }}} />
            )
        }

        const currentQuestion = questions[id];
        console.log(authedUser, currentQuestion.optionOne.votes);
        console.log(authedUser in currentQuestion.optionOne.votes);
        const optionOneSelected = currentQuestion.optionOne.votes.includes(authedUser) ? true: false
        const currentUser = users[currentQuestion.author];
        const totalVotes = currentQuestion.optionOne.votes.length + currentQuestion.optionTwo.votes.length
        const img = images('./' + currentUser.avatarURL);
        return (
            <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                <div className="card">
                    <div className="container">
                        <h3>{currentUser.name} Asks:</h3>
                        <div style={{float:"left", height: 400}}>
                            <img alt={currentUser.name + 's profile picture'} src={img} height={100} width={100}/>
                        </div>

                        <div>
                            <h4>Would you rather:</h4>
                            <div >
                                <h5>{currentQuestion.optionOne.text}</h5>
                                <p>{currentQuestion.optionOne.votes.length} out of {totalVotes} votes. <strong>({((currentQuestion.optionOne.votes.length / totalVotes) * 100).toFixed(2)}%)</strong></p>
                                {optionOneSelected ? <h3> You selected this answer! </h3> : null}
                            </div>
                            <hr/>
                            <h4>Or:</h4>
                            <div>
                                <h5>{currentQuestion.optionTwo.text}</h5>
                                <p>{currentQuestion.optionTwo.votes.length} out of {totalVotes} votes. <strong>({((currentQuestion.optionTwo.votes.length / totalVotes) * 100).toFixed(2)}%)</strong></p>
                                {!optionOneSelected ? <h3> You selected this answer! </h3> : null}
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const { questionId } = props
    return {
        authedUser,
        questions,
        users,
        id: questionId
    }
}

export default connect(mapStateToProps)(QuestionResults)