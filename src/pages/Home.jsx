import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUserStart } from "../redux/action";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTooltip,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUserStart());
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Error: {error}
      </div>
    );
  }
  const handleEdit = (id) => {
    console.log("Edit user:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wanted to delete  the user ?")) {
      dispatch(deleteUserStart(id));
    }
    toast.success("user deleted successfully");
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Management</h2>
      <MDBTable align="middle" striped bordered hover>
        <MDBTableHead dark>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <Link to={`/editUser/${user.id}`}>
                    <MDBTooltip tag="span" title="Edit">
                      <MDBBtn color="warning" size="sm" className="me-2">
                        <MDBIcon fas icon="pen" />
                      </MDBBtn>
                    </MDBTooltip>
                  </Link>
                  <MDBTooltip tag="span" title="Delete">
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                  </MDBTooltip>{" "}
                  <Link to={`/userInfo/${user.id}`}>
                    <MDBTooltip tag="span" title="Edit">
                      <MDBBtn size="sm" className="me-2">
                        <MDBIcon fas icon="eye" />
                      </MDBBtn>
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default Home;
