import React, { useEffect } from 'react';
import { getUsers } from '../../actions/userAction';
import { connect } from 'react-redux';
import User from './User';
import Spinner from '../../commons/Spinner';

const Users = ({ getUsers, users }) => {
    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const loading = users.loading;
    const allUsers = users.users;

    return (
        <div className='users'>
            <div className='container'>
                <div className='row'>
                    <h2 className='large text-primary '>Our registered users</h2>
                    {loading ? <Spinner /> : (allUsers ? (
                        <>
                            {allUsers.length !== null ? (
                                allUsers.map(user => (
                                    <div className='col-12' key={user.id}>
                                        <User user={user} />
                                    </div>

                                ))
                            ) : <h3 className='large text-primary'>No User to display</h3>}
                        </>

                    ) : <h3 className='large text-primary'>No User to display</h3>)}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    users: state.users
})
// export default Users;
export default connect(mapStateToProps, { getUsers })(Users)
