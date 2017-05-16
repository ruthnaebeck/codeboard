'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Whiteboard from './components/Whiteboard'
import AccountPage from './components/AccountPage'
import Timer from './components/Timer'

// Dispatchers
import {whoami} from './reducers/auth'
import {fetchCategories} from './reducers/categories'
import {fetchDifficulties} from './reducers/difficulties'
import {fetchQuestion} from './reducers/question'
import {fetchUserQuestions} from './reducers/userQuestions'

const Routes = ({onAppEnter, onQuestionEnter, onAccountEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRoute component={Home}/>
      <Route path='/timer' component={Timer} />
      <Route path="/question/:id" component={Whiteboard} onEnter={onQuestionEnter} />
      <Route path="/users/:id" component={AccountPage} onEnter={onAccountEnter}/>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* ------------- CONTAINER ---------------- */

const mapStateToProps = null
const mapDispatch = (dispatch) => ({
  onAppEnter: () => {
    dispatch(whoami())
    dispatch(fetchCategories())
    dispatch(fetchDifficulties())
  },
  onAccountEnter: (nextRouterState) => {
    const userId = nextRouterState.params.id
    dispatch(fetchUserQuestions(userId))
  },
  onQuestionEnter: (nextRouterState) => {
    const id = nextRouterState.params.id
    dispatch(fetchQuestion(id))
  }
})

export default connect(mapStateToProps, mapDispatch)(Routes)
