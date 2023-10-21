import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";

class Register extends Form {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
      password2: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string().required().label("Full Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email ID"),
    password: Joi.string().min(6).required().label("Password"),
    password2: Joi.string().valid(Joi.ref("password")).required().label("Confirm Password")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User Already Registered");
      }
    }
  };

  render() {
    const { data, errors } = this.state;

    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }

    const containerStyle = {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff"
    };

    const titleStyle = {
      fontSize: "28px",
      marginBottom: "30px",
      color: "#333",
      textAlign: "center"
    };

    const buttonStyle = {
      background: "linear-gradient(to bottom, #f39c12, #e67e22)", 
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "12px 24px",
      cursor: "pointer",
      width: "100%",
      fontSize: "18px",
      marginTop: "30px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", 
    };

    return (
      <React.Fragment>
        <ToastContainer />
        <div style={containerStyle}>
          <h1 style={titleStyle}>Create an Account</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              value={data.name}
              onChange={this.handleChange}
              label="Full Name"
              name="name"
              type="text"
              error={errors.name}
            />
            <Input
              name="username"
              value={data.username}
              label="Username"
              type="text"
              onChange={this.handleChange}
              error={errors.username}
            />
            <Input
              value={data.email}
              onChange={this.handleChange}
              label="Email ID"
              type="text"
              name="email"
              error={errors.email}
            />
            <Input
              value={data.password}
              onChange={this.handleChange}
              label="Password"
              type="password"
              name="password"
              error={errors.password}
            />
            <Input
              value={data.password2}
              onChange={this.handleChange}
              label="Confirm Password"
              name="password2"
              type="password"
              error={errors.password2}
            />
            <button style={buttonStyle} disabled={this.validate()}>
              Register
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
