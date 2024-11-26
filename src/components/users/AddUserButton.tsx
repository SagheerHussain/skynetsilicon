"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const AddUserButton: React.FC = () => {
  const handleAddUser = () => {
    // Logic to handle "Add User" action
    console.log("Add User button clicked");
  };

  return (
    <Button variant="default" size="default" onClick={handleAddUser}>
      Add User
    </Button>
  );
};

export default AddUserButton;
