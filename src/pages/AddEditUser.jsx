import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { createUserStart, updateUserStart } from "../redux/action";

function AddEditUser() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [validated, setValidated] = useState(false);

  const { name, email, phone, address } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get user data from Redux if editing
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id == id);

      if (user) {
        setFormValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
      }
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      if (id) {
        // Dispatch update action
        console.log("Update user:", { id, ...formValue });
        dispatch(updateUserStart({ id, formValue }));
      } else {
        // Dispatch add action
        console.log("inside Add user:", formValue);
        dispatch(createUserStart(formValue));
      }
      setTimeout(() => navigate("/"), 500);
      // Reset form and navigate
      setFormValue({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setValidated(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>{id ? "Edit User" : "Add User"}</h3>
            </div>
            <div className="card-body">
              <MDBValidation
                className="row g-3"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide a name."
                  invalid
                >
                  <MDBInput
                    label="Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                </MDBValidationItem>

                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide a valid email."
                  invalid
                >
                  <MDBInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </MDBValidationItem>

                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide a phone number."
                  invalid
                >
                  <MDBInput
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                  />
                </MDBValidationItem>

                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide an address."
                  invalid
                >
                  <MDBInput
                    label="Address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                    required
                    textarea
                    rows={3}
                  />
                </MDBValidationItem>

                <div className="col-12">
                  <MDBBtn type="submit" color="primary" className="me-2">
                    {id ? "Update" : "Submit"}
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="secondary"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </MDBValidation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditUser;
