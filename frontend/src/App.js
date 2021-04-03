import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrimaryLayout from './layouts/PrimaryLayout'

import Home from './containers/Home'
import Activation from './containers/Activation'
import Register from './containers/Register'
import Login from './containers/Login'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'

const App = () =>{
    return(
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
    );
}

export default App;