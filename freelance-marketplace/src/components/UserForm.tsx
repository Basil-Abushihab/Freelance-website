"use client";

import React, { useState, useEffect } from "react";

interface User {
  _id?: string;
  username: string;
  email: string;
  role: "client" | "freelancer";
}

interface UserFormProps {
  user?: User;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    role: "client",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ username: "", email: "", role: "client" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
