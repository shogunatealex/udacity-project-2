import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, addUserQuestion, addUserQuestionAnswer } from './users'
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveQuestions, addQuestion, addQuestionAnswer } from './questions';



export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
               dispatch(receiveUsers(users));
               dispatch(receiveQuestions(questions));
               dispatch(hideLoading());
            })
    }
}


export function handleAddQuestion (optionOneText, optionTwoText){

    return (dispatch, getState) => {
        const { authedUser, users } = getState()

        dispatch(showLoading())

        console.log(optionOneText, optionTwoText, authedUser);

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => {
                dispatch(addUserQuestion(question,users))
                return dispatch(addQuestion(question))
            })
            .then(() => dispatch(hideLoading()))
    }

}


export function handleSaveQuestionAnswer(answer, qid){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())


        return saveQuestionAnswer({
            authedUser, 
            qid, 
            answer
        })
            .then(() => {
                dispatch(addUserQuestionAnswer(authedUser, qid, answer ))
                dispatch(addQuestionAnswer(authedUser, qid, answer ))
            })
            .then(() => dispatch(hideLoading()))
    }
}