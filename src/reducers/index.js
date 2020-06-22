import { combineReducers } from 'redux';
import users from './users';
import { loadingBarReducer as loadingBar} from 'react-redux-loading';


export default combineReducers({
    authedUser,
    users,
    loadingBar
})