import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { register } from "../store/actions/user";
import { Loading, Message, FormContainer } from "../components";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const {
    user_loading: loading,
    user_error: error,
    user,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(email, username, password));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);
  return (
    <Wrapper>
      <div className="container page-100">
        {loading && (
          <div className="d-flex justify-content-center mt-5">
            <Loading />
          </div>
        )}
        {error.status && (
          <div className="mt-5">
            <Message type={"warning"} text={error.msg} />
          </div>
        )}
        <FormContainer>
          <h1>Sign In</h1>
          {message && <Message type={"warning"} text={message} />}
          <form onSubmit={handleAuthSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label mt-4">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUserame(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label mt-4"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword2"
                className="form-label mt-4"
              >
                Password Confirmation
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password Confirmation"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-3">
              Sign Up
            </button>
          </form>
          <div className="row py-3">
            <div className="col">
              Already have an account ?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="login-btn"
              >
                <strong>Login.</strong>
              </Link>
            </div>
          </div>
        </FormContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .login-btn {
    background: none;
    border: none;
    color: #839496;

    &:hover {
      border-bottom: 1px solid green;
    }
  }
`;

export default RegisterPage;
