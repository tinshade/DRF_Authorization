import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrimaryLayout from './layouts/PrimaryLayout'

import Home from './containers/Home'
import Activation from './containers/Activation'
import Register from './containers/Register'
import Login from './containers/Login'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'

import {Provider} from 'react-redux';
import store from './store';


const App = () =>{
    return(
        <Provider store={store}>
            <Router>
                <PrimaryLayout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/reset-password" component={ResetPassword} />
                    <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
                    <Route exact path="/activate/:uid/:token" component={Activation} />
                </Switch>
                </PrimaryLayout>
            </Router>
        </Provider>
    );
}

export default App;