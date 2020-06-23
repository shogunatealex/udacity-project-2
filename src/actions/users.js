export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_QUESTION_ANSWER = 'ADD_USER_QUESTION_ANSWER';
export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserQuestion (question, users){
    return {
        type: ADD_USER_QUESTION,
        question,
        users
    }
}

export function addUserQuestionAnswer (authedUser,qid,answer) {
    return {
        type: ADD_USER_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,

    }
}