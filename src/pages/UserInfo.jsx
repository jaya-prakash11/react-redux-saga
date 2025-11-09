import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function UserInfo() {
  const users = useSelector((state) => state.data.users);
  const loading = useSelector((state) => state.data.loading);
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find((res) => res.id == id);

  // Handle loading state
  if (loading) {
    return (
      <MDBContainer className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </MDBContainer>
    );
  }

  // Handle user not found
  if (!user) {
    return (
      <MDBContainer className="mt-5">
        <MDBCard alignment="center">
          <MDBCardBody>
            <MDBIcon
              fas
              icon="user-slash"
              size="3x"
              className="text-danger mb-3"
            />
            <MDBCardTitle>User Not Found</MDBCardTitle>
            <MDBCardText>The user with ID {id} does not exist.</MDBCardText>
            <MDBBtn color="primary" onClick={() => navigate("/")}>
              <MDBIcon fas icon="arrow-left" className="me-2" />
              Back to Users
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <MDBCardTitle className="mb-0">User Information</MDBCardTitle>
                <MDBBtn
                  color="link"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-decoration-none"
                >
                  <MDBIcon fas icon="arrow-left" className="me-1" />
                  Back
                </MDBBtn>
              </div>

              <div className="user-details">
                <div className="mb-3 p-3 bg-light rounded">
                  <MDBIcon fas icon="id-badge" className="me-2 text-primary" />
                  <strong>ID:</strong>
                  <MDBCardText className="ms-4 mb-0">{user.id}</MDBCardText>
                </div>

                <div className="mb-3 p-3 bg-light rounded">
                  <MDBIcon fas icon="user" className="me-2 text-primary" />
                  <strong>Name:</strong>
                  <MDBCardText className="ms-4 mb-0">{user.name}</MDBCardText>
                </div>

                <div className="mb-3 p-3 bg-light rounded">
                  <MDBIcon fas icon="envelope" className="me-2 text-primary" />
                  <strong>Email:</strong>
                  <MDBCardText className="ms-4 mb-0">{user.email}</MDBCardText>
                </div>

                <div className="mb-3 p-3 bg-light rounded">
                  <MDBIcon fas icon="phone" className="me-2 text-primary" />
                  <strong>Phone:</strong>
                  <MDBCardText className="ms-4 mb-0">
                    {user.phone || "N/A"}
                  </MDBCardText>
                </div>

                <div className="mb-3 p-3 bg-light rounded">
                  <MDBIcon
                    fas
                    icon="map-marker-alt"
                    className="me-2 text-primary"
                  />
                  <strong>Address:</strong>
                  <MDBCardText className="ms-4 mb-0">
                    {user.address || "N/A"}
                  </MDBCardText>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <MDBBtn color="primary" className="flex-fill">
                  <MDBIcon fas icon="edit" className="me-2" />
                  Edit User
                </MDBBtn>
                <MDBBtn color="danger" className="flex-fill">
                  <MDBIcon fas icon="trash" className="me-2" />
                  Delete User
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserInfo;
