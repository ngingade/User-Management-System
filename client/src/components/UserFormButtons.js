import React from "react";
import { Button } from "react-bootstrap";

const UserFormButtons = ({ onCancel, onCreate }) => {
  return (
    <div className="text-right mt-4">
      <Button className="mr-2" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onCreate}>
        Create
      </Button>
    </div>
  );
};

export default UserFormButtons;
