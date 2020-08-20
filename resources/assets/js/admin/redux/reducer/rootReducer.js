import {combineReducers} from 'redux'
import {profileReducer} from './profileReducer'
import {staffReducer} from './staffReducer'
import {kioskReducer} from './kioskReducer'

const allReducers = {
  profileReducer,
  staffReducer,
  kioskReducer
}

export const rootReducer = combineReducers(allReducers)
