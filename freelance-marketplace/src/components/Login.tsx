"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.role);

      window.dispatchEvent(new Event("userLoggedIn"));

      alert("Login successful!");
      router.push("/");
    } else {
      const errorData = await response.json();
      alert(`Error logging in: ${errorData.message || "Unknown error"}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://arkca.com/assets/img/login.gif"
        alt="Login Illustration"
        className="mb-8 w-72 h-48"
      />
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
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
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
