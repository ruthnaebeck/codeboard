import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  categories: require('./categories').default,
  difficulties: require('./difficulties').default
})

export default rootReducer
