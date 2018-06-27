import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import {
  Router,
  Route
} from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import logger from 'redux-logger'
import App from './components/App'
import history from './history';
// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
