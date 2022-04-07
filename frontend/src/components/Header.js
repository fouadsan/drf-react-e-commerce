import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { BiCartAlt, BiUser } from "react-icons/bi";

import { logout } from "../store/actions/user";

function Header() {
  const { total_items } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Ushop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <form className="d-flex">
                  <input
                    className="form-control me-sm-2"
                    type="text"
                    placeholder="Search"
                  />
                  <button
                    className="btn btn-secondary my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav right-nav">
              <li className="nav-item">
                <NavLink
                  to={"/cart"}
                  className={(isActive) =>
                    "nav-link cart-container" + (!isActive ? "active" : "")
                  }
                >
                  <BiCartAlt />
                  <span className="cart-value">{total_items}</span>
                </NavLink>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <NavLink
                    to={"/profile"}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.name}
                  </NavLink>
                  <div className="dropdown-menu">
                    <NavLink to={"/profile"} className="dropdown-item">
                      Profile
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to={"/login"}
                    className={(isActive) =>
                      "nav-link" + (!isActive ? "active" : "")
                    }
                  >
                    <BiUser />
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  .navbar-nav {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .right-nav {
    flex-direction: row;
    justify-content: center;
  }

  .nav-link {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .dropdown {
    width: 150px;
  }

  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }

  .cart-value {
    position: absolute;
    top: 1px;
    right: -8px;
    background: #b58900;
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: #ffffff;
    padding: 8px;
  }

  svg {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 992px) {
    .navbar-nav {
      margin-top: 0;
      margin-bottom: 0;
    }

    .nav-link {
      margin-left: 0;
      margin-right: 0;
    }

    .cart-value {
      top: 2px;
      right: 0;
    }
  }
`;

export default Header;
