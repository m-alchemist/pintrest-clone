import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import App from './components/app';
import MyImages from './components/my_images';
import UserWall from './components/user_wall';
import reducers from './reducers';
import {Router, Route, browserHistory} from 'react-router';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <Router history={browserHistory}>

    <Route path='/' component={App}/>
    <Route path='/user/:id' component={UserWall}/>
    <Route path='/myimages' component={MyImages}/>
    <Route path='/*' component={App}/>

  </Router>

  </Provider>
  , document.querySelector('.container-fluid'));
