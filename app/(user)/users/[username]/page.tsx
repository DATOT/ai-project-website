"use client"

import { createApi, User } from "@s/lib/api";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const api = createApi();

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams<{ username: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await api.getUserByUsername(params.username);
        if (!fetchedUser) {
          redirect("/404");
          return;
        }
        setUser(fetchedUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [params.username]);
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
          </div>
          {user.name && <h2 className="text-2xl font-bold">{user.name}</h2>}
          <p className="text-sm text-gray-500 mb-2">@{user.username}</p>
          <p className="text-gray-500 mb-2">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mt-1">
            <strong>Role:</strong>{" "}
            <span className={user.is_teacher ? "badge badge-primary" : "badge badge-secondary"}>
              {user.is_teacher ? "Teacher" : "Student"}
            </span>
          </p>
          {user.bio && (
            <p className="mt-2 text-gray-700">
              <strong>Bio:</strong> {user.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
