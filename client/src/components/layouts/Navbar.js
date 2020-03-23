import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";

const Navbar = ({ auth, logout }) => {
  const isAuth = auth.isAuthenticated;
  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item ">
        <Link className="nav-link" to="/articles">
          Feed
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/images">
          Images
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">
          users
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/create-article">
          Create
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/post-img">
          Post Img
        </Link>
      </li>

      <li className="nav-item right">
        <a onClick={logout} href="#!" className="nav-link ">
          {auth.user.name} {auth.user.lastName}{" "}
          <i className="fas fa-sign-out-alt" /> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav align-left">
      <li className="nav-item ">
        <Link className="nav-link" to="/articles">
          Feed
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/images">
          Images
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#6c63ff" }}
    >
      <Link className="navbar-brand" to="/">
        Internal Network
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        {isAuth ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
