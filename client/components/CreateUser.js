import React, { useState } from "react";
import UserForm from "./UserForm";
import UserFormButtons from "./UserFormButtons";
import { Container, Row, Col } from "react-bootstrap";

const CreateUser = ({ onSetShowForm }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
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

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!/^[a-zA-Z]+$/.test(newUser.firstName)) {
      newErrors.firstName = "Only alphabetical characters are allowed";
      isValid = false;
    }

    if (newUser.firstName.length > 100) {
      newErrors.firstName = "Maximum length is 100 characters";
      isValid = false;
    }

    if (!/^[a-zA-Z]+$/.test(newUser.lastName)) {
      newErrors.lastName = "Only alphabetical characters are allowed";
      isValid = false;
    }

    if (newUser.lastName.length > 100) {
      newErrors.lastName = "Maximum length is 100 characters";
      isValid = false;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newUser.email)
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      createUser();
    }
  };

  return (
    <Container className="align-content-center h-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Create User</h2>
          <UserForm
            onChange={handleInputChange}
            errors={errors}
            values={newUser}
          />
          <UserFormButtons
            onCancel={() => onSetShowForm(false)}
            onCreate={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
