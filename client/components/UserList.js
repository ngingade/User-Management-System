import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Container>
      <Row>
        {users.map((user) => (
          <Col key={user._id} xs={12} md={4} lg={3}>
            <Card className="row-spacing">
              <Card.Body>
                <Card.Title>
                  {user.firstName} {user.lastName}
                </Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Users;
