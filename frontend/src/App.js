import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

import Home from './components/Pages/Home';
import Alerts from './components/Pages/Alerts';
import Plugins from './components/Pages/Plugins';
import SideMenu from './components/Layout/SideMenu';
import BottomMenu from './components/Layout/BottomMenu';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alert from './components/Layout/Alert';
import PrivateRoute from './components/Routing/PrivateRoute';
import utilService from './services/utilService';

if (localStorage.token) {
  utilService.setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Fragment>
            <div className='page-container'>
              <SideMenu />
              <Route exact component={Register} path='/register' />
              <Route exact component={Login} path='/login' />
              <div className='main'>
                <PrivateRoute exact component={Home} path='/' />
                <Route exact component={Alerts} path='/alerts' />
                <Route exact component={Plugins} path='/plugins' />
              </div>
            </div>
            <BottomMenu />
          </Fragment>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
