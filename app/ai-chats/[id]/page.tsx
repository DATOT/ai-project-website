// app/ai-chats/[id]/page.tsx
"use client"; // make the page a client component

import { useParams } from "next/navigation"; // App Router hook
import ChatInterface from "./components/chatInterface";
import { ApiClient, User } from "@/shared/api";

const AiChatInterface = () => {
  const params = useParams(); // this is now a plain object
  const chatId = parseInt(params.id, 10); // convert to number
  const apiClient = new ApiClient();
  apiClient.setToken("myquicktoken");

  // Use a placeholder for now; replace with real user fetching later
  const currentUser: User = {
    id: 0,
    username: "Test User",
    email: "no",
    is_teacher: false,
    created_at: 0,
  };

  return (
    <div className="h-screen w-full">
      <ChatInterface chatId={chatId} currentUser={currentUser} apiClient={apiClient} />
    </div>
  );
};

export default AiChatInterface;
