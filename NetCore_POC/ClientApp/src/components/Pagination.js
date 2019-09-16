import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../store/actions";

const Pagination = props => {
  const { paginationData, fetchPosts } = props;
  return (
    <div className="text-center">
      <div>
        <span> {paginationData.entries} posts, </span>
        <span>
          Page {paginationData.current} of {paginationData.last}
        </span>
      </div>
      <div>
        <a
          onClick={() => fetchPosts(paginationData.previous)}
          className="mr-1"
          style={
            paginationData.previous === 1 && paginationData.current === 1
              ? {
                  pointerEvents: "none",
                  textDecoration: "none",
                  opacity: "0.5",
                  color: "gray"
                }
              : {
                  cursor: "pointer",
                  textDecoration: "underline",
                  opacity: "1",
                  color: "blue"
                }
          }
        >
          {`<Previous`}
        </a>
        <a
          onClick={() => fetchPosts(paginationData.next)}
          className="ml-1"
          style={
            paginationData.last === paginationData.current
              ? {
                  pointerEvents: "none",
                  textDecoration: "none",
                  opacity: "0.5",
                  color: "gray"
                }
              : {
                  cursor: "pointer",
                  textDecoration: "underline",
                  opacity: "1",
                  color: "blue"
                }
          }
        >
          {`Next>`}
        </a>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  null,
  mapDispatchToProps
)(Pagination);
