import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  questions: require('./questions').default,
})

export default rootReducer
