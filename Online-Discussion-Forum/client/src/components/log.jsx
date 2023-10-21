import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/common/input";
import Form from "./common/form";
import { login } from "../services/authService";

class Log extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string().required().email().label("Email ID"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem("token", jwt);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Email or Password");
      }
    }
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div
        className="container-fluid bg-light"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: "2rem"
        }}
      >
        <div
          className="col-lg-6 col-md-8 col-sm-10 mx-auto bg-white rounded shadow p-4"
        >
          <h1 className="text-center mb-4">Login</h1>

          <form onSubmit={this.handleSubmit}>
            <Input
              name="email"
              label="Email ID"
              value={this.state.data.email}
              onChange={this.handleChange}
              error={this.state.errors.email}
            />
            <Input
              name="password"
              label="Password"
              value={this.state.data.password}
              onChange={this.handleChange}
              error={this.state.errors.password}
              type="password"
            />
            <div className="text-center">
              <button
                className="btn btn-primary mt-3"
                disabled={this.validate()}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div
          className="col-lg-6 col-md-8 col-sm-10 mx-auto mt-3 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "linear-gradient(135deg, #ffc107, #ff9800)",
            color: "white",
            minHeight: "300px",
            padding: "145px"
          }}
        >
          <h2
            className="font-weight-bold"
            style={{
              whiteSpace: "nowrap",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              position: "relative",
              backgroundColor: "darkcyan",
              padding: "10px",
              borderRadius: "25px"
            }}
          >
            Online Discussion Forum
          </h2>
          <div
            style={{
              content: "",
              display: "block",
              width: "50px",
              height: "50px",
              backgroundColor: "gold",
              transform: "rotate(-45deg)",
              position: "absolute",
              top: "-15px",
              left: "50%",
              marginLeft: "-25px"
            }}
          ></div>
        </div>

        <ToastContainer />
      </div>
    );
  }
}

export default Log;
