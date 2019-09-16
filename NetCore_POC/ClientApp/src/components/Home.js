import React, { useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import PostContainer from "./PostContainer";
import Pagination from "./Pagination";
import { fetchPosts } from "../store/actions";

const Home = props => {
  const { fetchPosts } = props;
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const Loading = () => (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <React.Fragment>
      <br />
      <Dropdown.Divider />
      <br />
      {props.fetchPending || props.fetchError ? (
        <Loading />
      ) : (
        <div>
          {props.posts.map((post, Id) => {
            return <PostContainer item={post} key={Id} />;
          })}
          <Pagination paginationData={props.paginationData} />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    fetchPending: state.fetchPending,
    fetchError: state.fetchError,
    posts: state.posts.data ? state.posts.data.entries : null,
    paginationData: state.posts.data ? state.posts.data.pagination : null
  };
};
const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
