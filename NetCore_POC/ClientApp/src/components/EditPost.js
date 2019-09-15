import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import EditIcon from "../assets/pencil.png";
import DeleteIcon from "../assets/bin.png";
import Form from "react-bootstrap/Form";

const Post = props => {
  const { item } = props;
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const editedPost = {
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
    <React.Fragment>
      <Card bg="light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-between">
            <Col xs="2" style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
              <h6 className="mt-3 ml-4"> {item.author}</h6>
              <div className="mt-3 ml-4">{item.date}</div>
            </Col>
            <Col xs="10" className="pl-0">
              <Card.Header>
                <Row className="justify-content-between mr-1 ">
                  <Col sm="9">
                    <Form.Control
                      controlId="formTitle"
                      required
                      defaultValue={item.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a title.
                    </Form.Control.Feedback>
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
                <Form.Control
                  controlId="formBody"
                  required
                  as="textarea"
                  rows="2"
                  defaultValue={item.body}
                />
                <Form.Control.Feedback type="invalid">
                  Please write something.
                </Form.Control.Feedback>
              </Card.Body>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
    </React.Fragment>
  );
};

export default Post;
