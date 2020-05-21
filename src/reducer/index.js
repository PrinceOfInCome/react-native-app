import {combineReducers} from 'redux';
import auth from './AuthReducer';
export default combineReducers({
	authentication: auth,
});
