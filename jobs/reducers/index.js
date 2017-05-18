// All reducers here
import { combineReducers } from 'redux';

// local
import auth from './auth_reducer';

// must define at least 1 reducer that returns non-undefined

// App level State called auth
export default combineReducers({
    auth 
});