import {combineReducers} from 'redux';
import signInReducer from './signIn'
import loaderReducer from './loader';

export default combineReducers({
  signin: signInReducer,
  loaderReducer: loaderReducer,
});
