import React, { useState } from "react";
import UserForm from "./UserForm";
import UserFormButtons from "./UserFormButtons";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = ({ onSetShowForm }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      const data = await response.json();
      toast.success(`User "${data.firstName}" created successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsLoading(false);
      onSetShowForm(false);
    } catch (error) {
      setIsLoading(false);
      console.log(JSON.stringify(error));

      toast.error(`Error in creating user: ${error.errors[0].msg}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (newUser.firstName.trim() === "") {
      newErrors.firstName = "Firstname is required field";
      isValid = false;
    }

    if (newUser.firstName.length > 100) {
      newErrors.firstName = "Maximum length is 100 characters";
      isValid = false;
    }

    if (newUser.lastName.trim() === "") {
      newErrors.lastName = "Lastname is required field";
      isValid = false;
    }

    if (newUser.lastName.length > 100) {
      newErrors.lastName = "Maximum length is 100 characters";
      isValid = false;
    }

    if (newUser.email.trim() === "") {
      newErrors.email = "Email is required field";
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
      setIsLoading(true);
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
            loadingStatus={isLoading}
            onCreate={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
