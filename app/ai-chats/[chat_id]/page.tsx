// app/ai-chats/[id]/page.tsx
"use client"; // make the page a client component

import { useParams } from "next/navigation"; // App Router hook
import ChatInterface from "./components/chatInterface";
import { createApi, User } from "@/shared/lib/api";

const AiChatInterface = () => {
  const params = useParams<{ chat_id: any; }>(); // this is now a plain object
  const api = createApi();
  const user: User = api.currentUser();

  return (
    <div className="h-screen w-full">
      <ChatInterface chatId={params.chat_id} currentUser={user} apiClient={api} />
    </div>
  );
};

export default AiChatInterface;
