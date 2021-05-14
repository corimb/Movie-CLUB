import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import filter from './filter';

export default combineReducers({
    posts, auth, filter
})