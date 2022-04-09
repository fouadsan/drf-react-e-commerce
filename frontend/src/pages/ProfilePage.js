import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { getUserDetails, updateUserProfile } from "../store/actions/user";
import { Loading, Message } from "../components";
import { SET_USER_UPDATE_RESET } from "../store/constants/userConstants";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const {
    user_loading: loading,
    user_error: error,
    user,
    update_success,
  } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUserDetails());
    }
  }, [user, navigate, dispatch, update_success]);
  return (
    <Wrapper>
      <div className="container page-100">
        <div className="row">
          <div className="col-md-3">
            <h2>MY PROFILE</h2>
            {message && <Message type={"warning"} text={message} />}
            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label mt-4">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword2"
                  className="form-label mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password Confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary my-3">
                Update
              </button>
            </form>
          </div>
          <div className="col-md-9">
            <h2>MY ORDERS</h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

export default ProfilePage;
