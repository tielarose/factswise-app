import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function StudentLogin() {
  const [studentClassCode, setStudentClassCode] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log("form was submitted");
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="student_class_code">
              <Form.Label>Enter your class code</Form.Label>
              <Form.Control
                type="text"
                placeholder="class code"
                value={studentClassCode}
                onChange={(evt) => setStudentClassCode(evt.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
