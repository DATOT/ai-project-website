// app/ai-chats/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Chat, createApi, User } from "@s/lib/api";
import { useRouter } from "next/navigation";

const api = createApi();

const AIChats = () => {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [cUser, setCUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await api.currentUser();
        setCUser(user);

        const { chat_ids } = await api.getChatsByUserId(user.id);
        const chatPromises = chat_ids.map((id) => api.getChatById(id));
        const allChats = await Promise.all(chatPromises);
        const filtered = allChats.filter(c => {
          return c.is_ai;
        });

        setChats(filtered);
      } catch (err) {
        console.error("Failed to fetch AI chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createNewChat = async () => {
    if (!cUser) return; // make sure user exists
    try {
      const { id } = await api.createChat({ is_group: false, is_ai: true, name: `AI Chat #${chats.length + 1}` });
      setChats((prev) => [
        ...prev,
        { chat_id: id, is_ai: true, is_group: false, name: `AI Chat #${prev.length + 1}`, created_at: Date.now() },
      ]);
      console.log(id);
      await api.addMemberToChat({ chat_id: id, user_id: cUser.id });
    } catch (err) {
      console.error("Failed to create new AI chat:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-16 text-gray-500">Loading AI chats...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Chats</h1>
        <button onClick={createNewChat} className="btn btn-primary btn-sm">+ New Chat</button>
      </div>

      {/* Chat list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {chats.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-8">No AI chats yet. Start one!</p>
        )}
        {chats.map((chat) => {
          return (
            <div
              key={chat.chat_id}
              className="card card-bordered cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-200"
              onClick={() => router.push(`/ai-chats/${chat.chat_id}`)}
            >
              <div className="card-body flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full bg-linear-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                    AI
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="card-title text-lg">{chat.name || `AI Chat #${chat.chat_id}`}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Created: {new Date(chat.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIChats;
