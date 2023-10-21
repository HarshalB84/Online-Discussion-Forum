import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  const navBarStyles = {
    background: "#333", // Dark background color
  };

  const logoStyles = {
    width: "100px",
    height: "auto",
  };

  const navLinkStyles = {
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    color: "#fff", // White text color
    marginRight: "10px",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style={navBarStyles}>
      <NavLink className="navbar-brand" to="/">
        <img src="/images/logo.jpg" alt="CDAC Logo" style={logoStyles} />
      </NavLink>
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
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link ml-3" to="/" style={navLinkStyles}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link ml-2" to="/dashboard" style={navLinkStyles}>
              Dashboard
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/login" style={navLinkStyles}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/register" style={navLinkStyles}>
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/me" style={navLinkStyles}>
                  Hi {user.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/logout" style={navLinkStyles}>
                  LogOut
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
