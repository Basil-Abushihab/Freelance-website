"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.role);

      window.dispatchEvent(new Event("userLoggedIn"));

      alert("Registration successful!");
      router.push("/");
    } else {
      const errorData = await response.json();
      alert("Error registering user: " + errorData.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <video
        src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/signup-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--user-login-profile-create-account-mobiles-pack-science-technology-icons-8444442.mp4"
        autoPlay
        loop
        muted
        className="mb-8 w-48 h-48"
      />

      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
