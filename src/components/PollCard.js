import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from '../img/avatar1.png';
import "./PollCard.css";
const images = require.context('../img', true);


class PollCard extends Component {
    render() {
        const { id ,questions, users } = this.props;
        const currentQuestion = questions[id];
        const currentUser = users[currentQuestion.author];
        const img = images('./' + currentUser.avatarURL);
        return (
            <div className="card">
                <div className="container">
                    <h3>{currentUser.name} Asks:</h3>
                    <div style={{float:"left"}}>
                        <img src={img} height={100} width={100}/>
                    </div>

                    <div style={{marginLeft: 100}}>
                        <h4>Would you rather:</h4>
                        <ol>
                            <li>{currentQuestion.optionOne.text}</li>
                            <li>{currentQuestion.optionTwo.text}</li>
                        </ol>
                    </div>


                    <button>View Poll</button>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ questions, users }, id) {
    return {
        questions,
        users
    }
}

export default connect(mapStateToProps)(PollCard)