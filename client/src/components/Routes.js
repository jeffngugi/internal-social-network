import React from 'react'
import { Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './layouts/Dashboard';
import NotFound from './notfound/Notfound';
import Landing from './layouts/Landing';
import Users from './users/Users';
const Routes = () => {
    return (
        <>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={Landing} />
            <Route path='/not-found' exact component={NotFound} />
            <Route path='/users' exact component={Users} />
        </>
    )
}

export default Routes
