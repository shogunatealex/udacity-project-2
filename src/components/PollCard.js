import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollCard extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                </ul>
            </div>
        )
    }
}

export default PollCard;