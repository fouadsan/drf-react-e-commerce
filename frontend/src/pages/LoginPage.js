import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";

import * as userLoginActions from "../store/actions/user";
import { Loading, Message, FormContainer } from "../components";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(userLoginActions.login(email, password));
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
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
              />
            </div>

            <button type="submit" className="btn btn-primary my-3">
              Sign In
            </button>
          </form>
          <div className="row py-3">
            <div className="col">
              New Customer ?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="register-btn"
              >
                <strong>Register.</strong>
              </Link>
            </div>
          </div>
        </FormContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .register-btn {
    background: none;
    border: none;
    color: #839496;

    &:hover {
      border-bottom: 1px solid green;
    }
  }
`;

export default LoginPage;
