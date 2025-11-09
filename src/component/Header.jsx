import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBContainer,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
} from "mdb-react-ui-kit";

import { NavLink } from "react-router-dom";

function Header() {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar expand="lg" light bgColor="primary">
      <MDBContainer fluid>
        <MDBNavbarBrand className="text-white">
          <span style={{ marginRight: "10px" }}>
            <MDBIcon fas icon="book-open" />
          </span>
          Contact
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="text-white"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>

        <MDBCollapse navbar={true} open={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarLink className="nav-link">
              <NavLink to="/" className="text-white">
                Home
              </NavLink>
            </MDBNavbarLink>

            <MDBNavbarLink className="nav-link">
              <NavLink to="/addUser" className="text-white">
                Add User
              </NavLink>
            </MDBNavbarLink>

            <MDBNavbarLink className="nav-link">
              <NavLink to="/about" className="text-white">
                About
              </NavLink>
            </MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
