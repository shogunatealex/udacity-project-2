import React, {Component, Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import "./Nav.css"
import { connect } from 'react-redux'


class Nav extends Component {

    render () {
        const { users, authedUser } = this.props;

        return (
            (
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to ='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                Leaderboard
                            </NavLink>
                        </li>
                        {users[authedUser] ? (
                        <Fragment>
                            <li style={{marginLeft: 75}}>
                                <div style={{color: "white"}}>
                                    {users[authedUser].name +"'s Profile"}
                                </div>
                            </li>
                            <li>
                                <NavLink to='/logout' activeClassName='active'>
                                    Logout
                                </NavLink>
                            </li>
                        </Fragment>

                        ) : (
                        <li>
                            <NavLink to='/login' activeClassName='active'>
                                Login
                            </NavLink>
                        </li>
                        )}
        
                    </ul>
                </nav>
            )
        )
    } 
}


function mapStateToProps ({users, authedUser}) {
    return {
      authedUser,
      users
    }
}
  
export default connect(mapStateToProps)(Nav)