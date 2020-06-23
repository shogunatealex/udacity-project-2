import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./PollCard.css";
import { Redirect } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/shared'
const images = require.context('../img', true);


class AnswerQuestion extends Component {

    state = {
        option: ""
    }


    handleOnChange = (e) => {
        const option = e.target.value;
        this.setState({
            option
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const { option } = this.state
        console.log(option);
        const { dispatch, id } = this.props

        dispatch(handleSaveQuestionAnswer(option, id))

        this.setState(() => ({
            option: "",
            isLoggedIn: true
        }))
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
        const currentUser = users[currentQuestion.author];
        const img = images('./' + currentUser.avatarURL);
        console.log(currentQuestion);
        return (
            <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                <div className="card">
                    <div className="container">
                        <h3>{currentUser.name} Asks:</h3>
                        <div style={{float:"left"}}>
                            <img alt={currentUser.name + 's profile picture'} src={img} height={100} width={100}/>
                        </div>

                        <form onSubmit={this.handleOnSubmit}>
                            <div style={{marginLeft: 100}}>
                                <h4>Would you rather:</h4>
                                <select onChange={this.handleOnChange}>
                                    <option>Select an Answer</option>
                                    <option value="optionOne">{currentQuestion.optionOne.text}</option>
                                    <option value="optionTwo">{currentQuestion.optionTwo.text}</option>
                                </select>
                            </div>

                            <br/>
                            <button disabled={this.state.option ? false : true} type="submit">Submit</button>
                        </form>

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

export default connect(mapStateToProps)(AnswerQuestion)