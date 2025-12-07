"use client";
import { createApi } from "@s/lib/api";
// app/logout/page.tsx

import { useRouter } from "next/navigation";
import { useState } from "react"; const LogoutPage = () => {
  let api = createApi();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Call your logout API endpoint
      api.logoutUser();

      // Redirect to login or home after logout
      router.push("/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-base-100 p-6 rounded-lg shadow-md w-[25%] text-center space-y-4">
        <h1 className="text-2xl font-semibold">Logout</h1>
        <p>Are you sure you want to log out?</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="btn btn-error w-full"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="btn btn-ghost w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage
