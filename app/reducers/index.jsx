import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  categories: require('./categories').default,
  difficulties: require('./difficulties').default,
  question: require('./question').default,
  drawer: require('./drawer').default,
  userQuestions: require('./userQuestions').default,
  timer: require('./timer').default
})

export default rootReducer
