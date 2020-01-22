import React from 'react'

const User = ({ user }) => {
    const { first_name, last_name, email, gender, job_role, department, address } = user;
    return (
        <div >
            <div className='user'>
                <h3> {first_name}{' '}{last_name}</h3>
                <p>{gender}</p>
                <p>Works as  <b>{job_role}</b> in <b>{department}</b> department</p>
                <p>Address {address} || {email}</p>
            </div>

        </div>
    )
}

export default User
