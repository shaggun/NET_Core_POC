import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import CreatePost from "./CreatePost";
import { updateAuth } from "../store/actions";

const Header = props => {
  const [auth, setAuth] = useState(false);
  const [authGoogle, setAuthGoogle] = useState();
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "274652279966-6jsvv7uqnnbk4nkri6rl5tvi8qqkmiim.apps.googleusercontent.com",
          scope: "profile"
        })
        .then(() => {
          setAuthGoogle(window.gapi.auth2.getAuthInstance());
        });
    });
  }, []);

  useEffect(() => {
    if (authGoogle !== undefined) {
      onAuthChange();
      authGoogle.isSignedIn.listen(onAuthChange);
      console.log(authGoogle);
    }
  }, [authGoogle]);

  const onAuthChange = () => {
    if (authGoogle !== undefined) {
      setAuth(authGoogle.isSignedIn.get());
      props.updateAuth(authGoogle.isSignedIn.get());
    }
  };

  const onSignIn = () => {
    if (authGoogle !== undefined) {
      authGoogle.signIn();
    }
  };

  const onSignOut = () => {
    if (authGoogle !== undefined) {
      authGoogle.signOut();
    }
  };

  const [openCreate, setOpenCreate] = useState(false);
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
            {auth ? (
              <React.Fragment>
                <img
                  src={
                    authGoogle !== undefined
                      ? authGoogle.currentUser.Ab.w3.Paa
                      : "https://i.imgur.com/tfCW058.png"
                  }
                  width="45"
                  height="45"
                  className="d-inline-block align-top clip-circle"
                  alt="avatar"
                  style={{ clipPath: "circle(20px at center)" }}
                />
                <NavDropdown
                  alignRight
                  title={
                    authGoogle !== undefined
                      ? authGoogle.currentUser.Ab.w3.ig
                      : "username"
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => setOpenCreate(!openCreate)}
                    aria-controls="create-collapse"
                    aria-expanded={openCreate}
                  >
                    Create New Post
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onSignOut}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <Nav.Link onClick={onSignIn}>Log In With Google</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Collapse in={openCreate}>
        <div id="create-collapse">
          <br />
          {auth ? (
            <CreatePost
              author={
                authGoogle !== undefined
                  ? authGoogle.currentUser.Ab.w3.ig
                  : "author"
              }
              cancel={setOpenCreate}
            />
          ) : null}
        </div>
      </Collapse>
    </Container>
  );
};

const mapDispatchToProps = {
  updateAuth
};
export default connect(
  null,
  mapDispatchToProps
)(Header);
