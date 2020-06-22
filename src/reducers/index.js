import { combineReducers } from 'redux';
import users from './users';
import questions from './questions';
import { loadingBarReducer as loadingBar} from 'react-redux-loading';


export default combineReducers({
    users,
    questions,
    loadingBar
})