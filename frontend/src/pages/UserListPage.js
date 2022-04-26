import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

import { fetchUsers, deleteUser } from "../store/actions/user";
import { Loading, Message } from "../components";

function UserListPage() {
  const {
    user_loading: loading,
    user_error: error,
    users_list,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Wrapper>
      <div className="container page-100">
        <h2>Users List</h2>
        {loading ? (
          <div className="row justify-content-center">
            <Loading />
          </div>
        ) : error.status ? (
          <Message type={"warning"} text={error.msg} />
        ) : (
          <table className="table table-striped table-responsive table-hover table-sm table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users_list.map((user) => {
                const { id, email, username, is_admin } = user;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{is_admin ? <FaCheck /> : <FaTimes />}</td>
                    <td className="text-end">
                      <Link
                        to={`admin/user/${id}`}
                        className="btn btn-outline-light"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-warning ms-2"
                        onClick={() => handleDelete(id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  svg {
    height: 1.2rem;
    color: #2aa198;
  }
`;

export default UserListPage;
