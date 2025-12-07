"use client";
// app/ai-chats/[id]/page.tsx

import { useParams } from "next/navigation";
import ChatInterface from "@f/ai-chats/components/chatInterface";
import { createApi, User } from "@s/lib/api";
import { useEffect, useState } from "react";

const AiChatInterface = () => {
  const params = useParams<{ chat_id: any }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const api = createApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const current = await api.currentUser();
        console.log("Current User:", current);
        setUser(current);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to access this chat.</div>;

  return (
    <div className="h-screen w-full">
      <ChatInterface chatId={params.chat_id} currentUser={user} apiClient={api} />
    </div>
  );
};

export default AiChatInterface;
