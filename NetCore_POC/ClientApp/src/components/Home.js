import React, { useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import PostContainer from "./PostContainer";
import { fetchPosts } from "../store/actions";

const Home = props => {
  const { fetchPosts } = props;
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
      {props.fetchPending ? (
        <Spinner />
      ) : (
        <div>
          {props.posts.map((post, Id) => {
            return <PostContainer item={post} key={Id} />;
          })}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    fetchPending: state.fetchPending,
    posts: state.posts.data ? state.posts.data : null
  };
};
const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
