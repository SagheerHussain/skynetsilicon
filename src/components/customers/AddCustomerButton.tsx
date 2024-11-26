"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const AddCustomerButton: React.FC = () => {
  const handleAddUser = () => {
    console.log("Add User button clicked");
  };

  return (
    <Button variant="default" size="default" onClick={handleAddUser}>
      Add Customer
    </Button>
  );
};

export default AddCustomerButton;
