import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import EditIcon from "../assets/pencil.png";
import DeleteIcon from "../assets/bin.png";
import { connect } from "react-redux";
import { deletePost } from "../store/actions";

const Post = props => {
  const { item, isLoggedIn } = props;
  const onCancel = () => {
    props.deletePost(item.id);
  };
  return (
    <React.Fragment>
      <Card bg="light">
        <Row className="justify-content-between">
          <Col xs="2" style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
            <h6 className="mt-3 ml-4 mb-1"> {item.author}</h6>
            <div className="ml-4" style={{ fontSize: "0.7rem" }}>
              {item.date}
            </div>
          </Col>
          <Col xs="10" className="pl-0">
            <Card.Header>
              <Row className="justify-content-between mr-1 ml-1 ">
                <Card.Title>{item.title}</Card.Title>
                {isLoggedIn ? (
                  <div>
                    <Button
                      onClick={() => props.onEdit(true)}
                      variant="outline-secondary"
                      className="mr-1"
                    >
                      <img src={EditIcon} width="20" alt="edit" />
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this post?"
                          )
                        )
                          onCancel();
                      }}
                      variant="outline-secondary"
                      className="ml-1"
                    >
                      <img src={DeleteIcon} width="20" alt="edit" />
                    </Button>
                  </div>
                ) : null}
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text>{item.body}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <br />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loggedIn
  };
};

const mapDispatchToProps = {
  deletePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
