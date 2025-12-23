"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { createApi, User } from "@s/lib/api";
import { useEffect, useState } from "react";

const ChatInterface = dynamic(
  () => import("@/features/ai-chats/components/ChatInterface"),
  { ssr: false }
);

const AiChatInterface = () => {
  const params = useParams<{ [key: string]: string | undefined }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const api = createApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const current = await api.currentUser();
        setUser(current);
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
      <a href="/homepage" className="absolute m-2 z-50 btn btn-rounded btn-ghost"> {"<"} </a>
      <ChatInterface
        key={params.chat_id}
        chatId={Number(params.chat_id)}
        currentUser={user}
        apiClient={api}
      />
    </div>
  );
};

export default AiChatInterface;
