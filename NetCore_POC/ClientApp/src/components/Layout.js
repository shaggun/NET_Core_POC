import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";
import Header from "./Header";
export default props => (
  <div>
    <NavMenu />
    <Header />
    <Container>{props.children}</Container>
  </div>
);
