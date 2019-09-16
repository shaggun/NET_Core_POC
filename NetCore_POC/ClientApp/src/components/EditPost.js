import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { editPost } from "../store/actions";

const EditPost = props => {
  const { item } = props;
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const editedPost = {
        id: item.id,
        body: form.formBody.value,
        title: form.formTitle.value,
        author: item.author,
        date: item.date
      };
      props.editPost(editedPost);
      props.onEdit(false);
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <React.Fragment>
      <Card bg="light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-between">
            <Col xs="2" style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
              <h6 className="mt-3 ml-4 mb-1"> {item.author}</h6>
              <div className="ml-4" style={{ fontSize: "0.7rem" }}>
                {item.date}
              </div>
            </Col>
            <Col xs="10" className="pl-0">
              <Card.Header>
                <Row className="justify-content-between mr-1 ">
                  <Col sm="9">
                    <Form.Group controlId="formTitle">
                      <Form.Control required defaultValue={item.title} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <div>
                    <Button
                      onClick={() => props.onEdit(false)}
                      variant="outline-secondary"
                      className="mr-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-secondary"
                      className="ml-1"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Row>
              </Card.Header>
              <Card.Body>
                <Form.Group controlId="formBody">
                  <Form.Control
                    required
                    as="textarea"
                    rows="2"
                    defaultValue={item.body}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write something.
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  editPost
};
export default connect(
  null,
  mapDispatchToProps
)(EditPost);
