'use strict'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import store from './store'
import Routes from './Routes'

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
)

render(
    <App />,
  document.getElementById('main')
)
