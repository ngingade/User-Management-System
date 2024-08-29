import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import LoadingStatus from "./LoadingStatus";

function Users({ onSetShowForm }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3002/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="pt-4 h-100">
      {isLoading ? (
        <LoadingStatus />
      ) : (
        <Row>
          {users.map((user) => (
            <Col key={user._id} xs={12} md={4} lg={3}>
              <Card className="row-spacing card-wrapper">
                <Card.Body className="align-content-center">
                  <Card.Title>
                    {user.firstName} {user.lastName}
                  </Card.Title>
                  <Card.Text> {user.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={12} md={4} lg={3}>
            <Card
              className="row-spacing card-wrapper"
              onClick={() => onSetShowForm(true)}
            >
              <Card.Body
                className="align-content-center text-center cursor-pointer"
                title="Create User"
              >
                <BsPlus size={50} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Users;
