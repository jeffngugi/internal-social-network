import React, { useEffect } from 'react';
import { getUsers } from '../../actions/userAction';
import { connect } from 'react-redux';

const Users = ({ getUsers }) => {
    // useEffect(getUsers);

    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            <h3>  Users List component </h3>
        </div>
    )
}


const mapStateToProps = (state) => ({
    users: state.users
})
// export default Users;
export default connect(mapStateToProps, { getUsers })(Users)
