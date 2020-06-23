import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom"

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }


    handleSubmit = (e) => {
        console.log('here');
        e.preventDefault();

        const { optionOneText, optionTwoText } = this.state

        console.log('New Question:', optionOneText, optionTwoText);

        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
        }))
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
          ...this.state,
          [e.target.name]: value
        });
    }

    render() {
        const { authedUser } = this.props
        if(!authedUser){
            console.log(this.props.location);
            return (
                <Redirect 
                to={{
                    pathname:"/login",
                    state: { from: this.props.location }}} />
            )
        }
        return (
                <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                        <div className="card" >
                            <div className="container" >
                                <h2>
                                    Create a New Question
                                </h2>
                                <form onSubmit={this.handleSubmit}>
                                    <h3>Would you rather:</h3>
                                    <input 
                                        placeholder="option one..."
                                        name="optionOneText"
                                        onChange={this.handleChange}
                                        value={this.state.optionOneText}/>
                                    <h3>or</h3>
                                    <input 
                                        placeholder="option two..."
                                        name="optionTwoText"
                                        onChange={this.handleChange}
                                        value={this.state.optionTwoText}/>
                                    <br/>
                                    <button >Submit</button>
                                </form>
                            </div>

                        </div>
                </div>

        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}


export default connect(mapStateToProps)(NewQuestion)