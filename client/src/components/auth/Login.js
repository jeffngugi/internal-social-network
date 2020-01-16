import React, { useState } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
const Login = ({ login }) => {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        login(formData)
        console.log(formData);
    }
    return (
        <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='RegisterForm'>
                <h3>
                    Register with Us
            </h3>
                <div className='form-group'>
                    <input type='email' className='form-control' id='email' name='email' value={email} onChange={e => onChange(e)} placeholder='Email' />
                </div>

                <div className='form-group'>
                    <input type='password' className='form-control' id='password' name='password' value={password} onChange={e => onChange(e)} placeholder='Password' />

                </div>

            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
        </form>
    )
}

export default connect(null, { login })(Login);
