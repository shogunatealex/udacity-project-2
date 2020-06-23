import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollCard from './PollCard';


class PollCardList extends Component {
    render() {
        const { questionIds } = this.props;
        return (
            questionIds.length ? questionIds.map((questionId) => {
                return (
                    <PollCard key={"display-id" + questionId} id={questionId}/>
                )
            }) :
            <div>
                <h4 style={{textAlign: "center"}}>There's nothing here!</h4>
            </div>
        )
    }
}


export default connect()(PollCardList)