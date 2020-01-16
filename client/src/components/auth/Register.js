import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';



const Register = ({ registerUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        job_role: '',
        department: '',
        address: '',
        gender: ''

    })
    const { email, first_name, last_name, job_role, department, address, gender } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        registerUser(formData)
    }

    return (
        <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='RegisterForm'>
                <h3>
                    Login
                </h3>
                <div className='form-group'>

                    <input type='email' className='form-control' id='email' name='email' value={email} onChange={e => onChange(e)} placeholder='Email' />
                </div>
                <div className='form-group'>

                    <input type='text' className='form-control' id='first_name' name='first_name' value={first_name} onChange={e => onChange(e)} placeholder='First Name' />
                </div>
                <div className='form-group'>

                    <input type='text' className='form-control' id='last_name' name='last_name' value={last_name} onChange={e => onChange(e)} placeholder='Last Name' />
                </div>
                <div className='form-group'>

                    <input type='text' className='form-control' id='job_role' name='job_role' value={job_role} onChange={e => onChange(e)} placeholder='Job Role' />
                </div>
                <div className='form-group'>

                    <input type='text' className='form-control' id='department' name='department' value={department} onChange={e => onChange(e)} placeholder='Department' />
                </div>
                <div className='form-group'>

                    <input type='text' className='form-control' id='address' name='address' value={address} onChange={e => onChange(e)} placeholder='Address' />
                </div>
                <div className='form-group'>
                    <label>
                        Gender
                    </label>
                    <select name='gender' value={gender} onChange={e => onChange(e)}>
                        <option></option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>

            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
        </form>
    )
}

export default connect(null, { registerUser })(Register);
