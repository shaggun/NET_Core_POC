import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Post from "./Post";
import EditPost from "./EditPost";
import PostContainer from "./PostContainer";

const Home = props => {
  const item = {
    author: "Anonymous",
    date: "Date",
    title: "Titulo",
    body: "This is a generic post"
  };

  return (
    <React.Fragment>
      <br />
      <Dropdown.Divider />
      <br />
      <div>
        <PostContainer item={item} />
      </div>
    </React.Fragment>
  );
};

export default connect()(Home);
