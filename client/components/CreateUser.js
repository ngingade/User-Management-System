import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

function CreateUser({ onSetShowForm }) {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const createUser = async () => {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    onSetShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser();
  };

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <Container className="align-content-center h-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Users</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label className="mt-4">Firstname</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label className="mt-4">Lastname</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="mt-4">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Row className="mt-4">
              <Col md={12} className="text-right">
                <Button
                  className="col-4 mr-3"
                  variant="secondary"
                  type="button"
                  onClick={() => onSetShowForm(false)}
                >
                  Cancel
                </Button>
                <Button className="col-4" variant="primary" type="submit">
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateUser;
