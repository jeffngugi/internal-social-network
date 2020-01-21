import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const Landing = ({ auth }) => {
    if (auth.isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div>
            <h1>Landing page for internal social network</h1>
            <p>
                This is a company internal social network landing page for team members to communicate
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)
