import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import loggerSettings from './redux/loggerSettings.js'
import initialState from './initialState.js'
import levelSettings from './levelSettings.js'
import reducers from './redux/rootReducer.js'
import App from './components/App.js'

const logger = createLogger(loggerSettings)
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunk.withExtraArgument(levelSettings),
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
