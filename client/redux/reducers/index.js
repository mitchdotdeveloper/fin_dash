import { combineReducers } from 'redux';
import authReducer from './authorize';
import userReducer from './user';

const rootReducer = combineReducers({
  authReducer,
  userReducer
});

export default rootReducer;