import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import CreatePost from "./CreatePost";

const Header = props => {
  const [auth, setAuth] = useState(false);
  const [openCreate, setOpenCreate] = useState(true);
  return (
    <Container>
      <Navbar
        style={{ height: "5rem" }}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand href="#home">NET Core POC</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {!auth ? (
              <React.Fragment>
                <img
                  src="https://i.imgur.com/tfCW058.png"
                  width="45"
                  height="45"
                  className="d-inline-block align-top clip-circle"
                  alt="avatar"
                  style={{ clipPath: "circle(20px at center)" }}
                />
                <NavDropdown
                  alignRight
                  title="User Name"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => setOpenCreate(!openCreate)}
                    aria-controls="create-collapse"
                    aria-expanded={openCreate}
                  >
                    Create New Post
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <Nav.Link eventKey={2}>Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Collapse in={openCreate}>
        <div id="create-collapse">
          <br />
          <CreatePost cancel={setOpenCreate} />
        </div>
      </Collapse>
    </Container>
  );
};

export default connect()(Header);
