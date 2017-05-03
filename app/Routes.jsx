'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import Home from './components/Home'
import NotFound from './components/NotFound'

const Routes = () => ( // { functions from mapDispatch }
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

/* ------------- CONTAINER ---------------- */

const mapStateToProps = null
const mapDispatch = null

export default connect(mapStateToProps, mapDispatch)(Routes)
