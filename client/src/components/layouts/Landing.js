import React from "react";
import { connect } from "react-redux";

import { Redirect, Link } from "react-router-dom";

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container-flex landing-page">
      <div className="row">
        <div className="col-sm-12 col-lg-6 left">
          <div className="landing-left">
            <h2>Connect with workers</h2>
            <p>
              Teamwork is an internal social network for organizations’
              employees. The goal of this application is to facilitate more
              interaction between colleagues and facilitate team bonding.
            </p>
            <Link to="/login">
              <button className="primaryBtn">Login</button>
            </Link>
            <Link to="/register">
              <button className="primaryBtn">Register</button>
            </Link>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 landing_image">
          <img src="/images/landing.png" alt="Creative team" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
