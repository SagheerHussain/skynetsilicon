"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle } from "lucide-react";

const AddUserButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddUser = async () => {
    if (!name || !email) {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Please fill in all fields.</span>
          </div>
        ),
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/googleSheets/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      const result = await response.json();

      toast({
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>User added successfully!</span>
          </div>
        ),
        variant: "default"
      });

      setIsModalOpen(false);
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast({
        description: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Failed to add user. Please try again.</span>
          </div>
        ),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add User</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter email"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddUserButton;
