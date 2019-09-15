import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CreatePost = props => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const newPost = {
        //id: uuid.v1(), // Generates a RFC4122 UUID for the ID
        author: "dummy",
        date: "date",
        body: form.formBody.value,
        title: form.formTitle.value
      };
      //methods
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Card bg="light">
      <Card.Body>
        <h5 className="text-center">Create New Post</h5>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formTitle">
            <Form.Label column sm="2">
              Title:
            </Form.Label>
            <Col sm="10">
              <Form.Control required placeholder="enter a title" />
              <Form.Control.Feedback type="invalid">
                Please provide a title.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formBody">
            <Form.Label column sm="2">
              Text Area:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                as="textarea"
                rows="2"
                placeholder="say something"
              />
              <Form.Control.Feedback type="invalid">
                Please write something.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Row className="justify-content-center">
            <Button
              onClick={() => props.cancel(false)}
              className="mr-1"
              variant="outline-secondary"
            >
              Cancel
            </Button>

            <Button
              data-cy="button-save-post"
              className="ml-1"
              variant="outline-secondary"
              type="submit"
            >
              Post
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
