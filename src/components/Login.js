import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';


class Logout extends Component {
    state = {
        isLoggedIn: false,
        user: ""
    }


    handleOnChange = (e) => {
        const user = e.target.value;
        this.setState({
            user
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const { user } = this.state

        const { dispatch } = this.props

        dispatch(setAuthedUser(user))

        this.setState(() => ({
            user: "",
            isLoggedIn: true
        }))
    }


    render() {
        
        const { isLoggedIn } = this.state;
        const { userIds, users } = this.props;
        if(isLoggedIn){
            const { from } = this.props.location.state || { from: { pathname: '/' } };
            return <Redirect to={from}/>
        }
        return (
            <div style={{width:500, border: "1px solid #AAAAAA", margin: "auto"}}>
                <div className="card">
                    <div className="container">
                        <h3>Login As:</h3>
                        <form onSubmit={this.handleOnSubmit}>
                            <select name='login-user' onChange={this.handleOnChange}>
                                <option value="" defaultChecked={true}>Pick a User</option>
                                {userIds.map((userId)=>{
                                    return (
                                        <option value={userId}>
                                            {users[userId].name}
                                        </option>
                                    )
                                })}
                            </select>
                            <button disabled={this.state.user ? false : true} type="submit">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        userIds: Object.keys(users)
            .sort((a,b) => (
                users[b].timestamp - users[a].timestamp
            )),
        users
    }
}


export default connect(mapStateToProps)(Logout)