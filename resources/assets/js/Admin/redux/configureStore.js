import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import postsReducer from './reducers/postsReducer'

const configureStore = preloadedState => {
  const composed = applyMiddleware(thunk)

  return createStore(postsReducer, preloadedState, compose(composed))
}

export default configureStore
