import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/authAction";
import { Redirect } from "react-router-dom";
const Login = ({ login, auth, errors, clearErrors }) => {
  //states
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });
  //effects
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  //constants declarations
  const { email, password } = formData;

  //methods / functions
  const onChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    clearErrors();
    login(formData);
  };

  const errorAlert =
    Object.entries(errors).length === 0 ? null : (
      <div className="alert alert-warning" role="alert">
        {errors}
      </div>
    );

  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="Login">
      <form className="form" onSubmit={e => onSubmit(e)} noValidate>
        <div className="RegisterForm">
          {errorAlert ? errorAlert : null}
          <h3 className="headers">Login</h3>
          <p className="paragraphs">Login to interact with the co-workers.</p>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              placeholder="Password"
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary primaryBtn"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
