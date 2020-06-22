import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./PollCard.css";
const images = require.context('../img', true);


class Leaderboard extends Component {
    render() {
        const { id ,questions, users, userIds } = this.props;
        // const currentQuestion = questions[id];
        // const currentUser = users[currentQuestion.author];
        // const img = images('./' + currentUser.avatarURL);
        console.log(users, userIds);
        return (
                <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                    {userIds.map((userId) => {
                        const currentUser = users[userId];
                        const img = images('./' + currentUser.avatarURL);
                        const questionsAnswered = Object.keys(currentUser.answers).length;
                        const questionsAsked = currentUser.questions.length;
                        return (
                        <div className="card" >
                            <div className="container" style={{height: 150}}>
                                <h3>
                                    {users[userId].name}
                                </h3>
                                <div style={{float:"left"}}>
                                    <img src={img} height={100} width={100}/>
                                </div>
                                <p>
                                    Answered Questions: {questionsAnswered}
                                </p>
                                <p>
                                    Asked Questions: {questionsAsked}
                                </p>
                                
                                <p> 
                                    Score: {questionsAnswered + questionsAsked}
                                </p>
                            </div>

                        </div>
                        )
                    })}
                </div>

        )
    }
}

function mapStateToProps({ questions, users }, id) {
    return {
        questions,
        userIds: Object.keys(users)
            .sort((a,b) => (
                (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)
            )),
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)