import Users from "../components/UserList";
import CreateUser from "../components/CreateUser";
import React, { useState } from "react";
import "../styles/styles.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleSetShowForm = (value) => {
    setShowForm(value);
  };

  return (
    <>
      {!showForm && <Users onSetShowForm={handleSetShowForm} />}
      {showForm && <CreateUser onSetShowForm={handleSetShowForm} />}
    </>
  );
}
export default App;
