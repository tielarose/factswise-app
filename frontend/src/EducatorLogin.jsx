import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EducatorLogin() {
  const [educatorEmail, setEducatorEmail] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("line 13, before fetch");
    fetch(`/api/educator/login/${educatorEmail}`).then((response) =>
      console.log(response.json)
    );
    // .then((responseJson) => console.log(responseJson));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={3}>
          <Form.Group controlId="educator_email">
            <Form.Label>Enter your email to continue</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={educatorEmail}
              onChange={(evt) => setEducatorEmail(evt.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default EducatorLogin;
