import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {rootReducer} from './reducer/rootReducer'

export const store = createStore(rootReducer, applyMiddleware(thunk))
