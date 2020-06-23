import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./main.css";
import { Redirect } from 'react-router-dom';
const images = require.context('../img', true);


class Leaderboard extends Component {
    render() {
        const { users, userIds, authedUser } = this.props;

        if(!authedUser){
            return (
                <Redirect 
                to={{
                    pathname:"/login",
                    state: { from: this.props.location }}} />
            )
        }

        return (
                <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                    {userIds.map((userId) => {
                        const currentUser = users[userId];
                        const img = images('./' + currentUser.avatarURL);
                        const questionsAnswered = Object.keys(currentUser.answers).length;
                        const questionsAsked = currentUser.questions.length;
                        return (
                        <div key={"leaderboard-" + userId} className="card" >
                            <div className="container" style={{height: 150}}>
                                <h3>
                                    {users[userId].name}
                                </h3>
                                <div style={{float:"left"}}>
                                    <img alt={currentUser.name + 's profile picture'} src={img} height={100} width={100}/>
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

function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        userIds: Object.keys(users)
            .sort((a,b) => (
                (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)
            )),
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)