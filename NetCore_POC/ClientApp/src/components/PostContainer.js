import React, { useState } from "react";
import Post from "./Post";
import EditPost from "./EditPost";

const PostContainer = props => {
  const [editionOpen, setEditionOpen] = useState(false);
  return (
    <React.Fragment>
      {editionOpen ? (
        <EditPost onEdit={setEditionOpen} item={props.item} />
      ) : (
        <Post item={props.item} onEdit={setEditionOpen} />
      )}
    </React.Fragment>
  );
};

export default PostContainer;
