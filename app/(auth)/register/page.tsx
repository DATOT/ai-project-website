// app/register/page.tsx
"use client";

// TODO: add a return to homepage button
import { useState } from "react";
import { ApiClient } from "@s/lib/api";

const api = new ApiClient();

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.registerUser({
        username,
        name,
        email,
        password,
        is_teacher: isTeacher,
      });

      // redirect after success
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <form
        onSubmit={handleRegister}
        className="bg-base-100 p-6 rounded-lg shadow-md w-[25%] space-y-4 m-8"
      >
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            className="input w-full"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="input w-full"
            placeholder={username ? username : "Enter name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="input w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            className="input w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
          <span>Register as teacher</span>
        </div>

        <button className="btn w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div>
          Already have an account?{" "}
          <a href="/login" className="link">
            Login here.
          </a>
        </div>
      </form>
      <a
        href="/"
        className="link"
      >
        Back to Home
      </a>
    </div>
  );
}
