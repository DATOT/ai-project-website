"use client";

import { useParams } from "next/navigation";
import GraphGuard from "@/features/graphs/components/ui/GraphGuard";
import { createApi } from "@/shared/lib/api";
import { useEffect, useState } from "react";

const api = createApi();

export default function GraphPageWrapper() {
  const { user_id } = useParams();
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await api.getUserById(Number(user_id));
        setUserType(user.is_teacher ? "teacher" : "student");
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user_id]);

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (!userType) return <div className="text-center mt-20 text-red-500">User not found</div>;

  return (
    <GraphGuard userId={Number(user_id)}>
    </GraphGuard>
  );
}
