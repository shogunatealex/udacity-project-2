import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser';


class Logout extends Component {
    state = {
        isLoggedOut: false
    }

    componentDidMount(){
        const { dispatch } = this.props
        dispatch(unsetAuthedUser())
        this.setState({
            isLoggedOut: true
        })
    }

    render() {
        const { isLoggedOut } = this.state;
        if(isLoggedOut){
            return <Redirect to='/login'/>
        }
        return (
            <h1 style={{textAlign: "center"}}>Logging Out</h1>
        )
    }
}


export default connect()(Logout)