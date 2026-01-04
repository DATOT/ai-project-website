// app/login/page.tsx
"use client";

import { useState } from "react";
import { ApiClient } from "@s/lib/api";

const api = new ApiClient();

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await api.loginUser({ username, password });

      // save token for API usage
      localStorage.setItem("token", result.token);

      // redirect after login
      window.location.href = `/users/${username}`; // change if needed
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <form
        onSubmit={handleLogin}
        className="bg-base-100 p-6 rounded-lg shadow-md w-[25%] space-y-4 m-8"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input w-full"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input w-full"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full outline-0"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div>Don't have an account yet? <a href="/register" className="link">Register here.</a></div>
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
