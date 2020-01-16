import React from 'react'
import { Route } from 'react-router-dom';
import Register from './auth/Register'
import Login from './auth/Login'
import Dashboard from './layouts/Dashboard'
import NotFound from './notfound/Notfound'

const Routes = () => {
    return (
        <>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Dashboard} />
            <Route path='/not-found' exact component={NotFound} />
        </>
    )
}

export default Routes