import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { BiCartAlt, BiUser } from "react-icons/bi";

function Header() {
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
                    "nav-link" + (!isActive ? "active" : "")
                  }
                >
                  <BiCartAlt />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/auth"}
                  className={(isActive) =>
                    "nav-link" + (!isActive ? "active" : "")
                  }
                >
                  <BiUser />
                </NavLink>
              </li>
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
  }
`;

export default Header;
