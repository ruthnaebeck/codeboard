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
import Popup from './components/Popup'

// Dispatchers
import {whoami} from './reducers/auth'
import {fetchCategories} from './reducers/categories'
import {fetchDifficulties} from './reducers/difficulties'
import {fetchQuestion} from './reducers/question'

const Routes = ({onAppEnter, onQuestionEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRoute component={Home}/>
      <Route path="/question/:id" component={Whiteboard} onEnter={onQuestionEnter} />
      <Route path="/popup" component={Popup} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* ------------- CONTAINER ---------------- */

const mapStateToProps = null
const mapDispatch = dispatch => ({
  onAppEnter: () => {
    dispatch(whoami())
    dispatch(fetchCategories())
    dispatch(fetchDifficulties())
  },
  onQuestionEnter: (nextRouterState) => {
    const id = nextRouterState.params.id
    dispatch(fetchQuestion(id))
  }
})

export default connect(mapStateToProps, mapDispatch)(Routes)
