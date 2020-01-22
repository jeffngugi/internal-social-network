import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './layouts/Dashboard';
import NotFound from './notfound/Notfound';
import Landing from './layouts/Landing';
import Users from './users/Users';
import PrivateRoute from '../commons/PrivateRoute';
import Articles from './articles/Articles';
const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <Route exact path='/articles' component={Articles} />
                <Route exact path='/' component={Landing} />
                <Route path='/not-found' exact component={NotFound} />
                <Route path='/users' exact component={Users} />

                <PrivateRoute exact path='/users' component={Users} />
            </Switch>

        </>
    )
}

export default Routes
