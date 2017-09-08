import React from 'react'; // needed
import ReactDOM from 'react-dom';
import Home from './components/layout/Home.js';

import Login from './Login/Login';
import PollDetails from './components/layout/PollDetails.js';
import EditPoll from './components/presentation/EditPoll.js';
import CreatePoll from './components/presentation/CreatePoll';

import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,IndexRoute} from 'react-router';

//import makeMainRoutes from './components/routes'
import Auth from './utils/Auth';

const mountNode = document.getElementById('root');


ReactDOM.render( 
  <Router history={browserHistory}>
    <Route path="/" component={Container} >
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="logout" onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();
        // change the current URL to /
        replace('/');}} />
      <Route path="Polldetailfull/:id" component={PollDetails}  />
      <Route path="Editthepoll/:id" component={EditPoll}  />
      <Route path="createPoll" getComponent={(location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, CreatePoll);
        } else {
          callback(null, Home);
        }
      }} />
    </Route>
  </Router>,mountNode);