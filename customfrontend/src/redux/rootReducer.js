import { combineReducers } from 'redux';
import adminReducer from './reducers/adminReducer';


const allReducer = {
 adminReducer,
};


export const rootReducer = combineReducers(allReducers);