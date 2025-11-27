"use client"
import { useEffect, useState } from "react";
import { Chat, ApiClient } from "@/shared/api";

const api = new ApiClient();
// api.setToken("your-token");

const AIChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const user = await api.currentUser();
        const { chat_ids } = await api.getChatsByUserId(user.id);

        const chatPromises = chat_ids.map((id) => api.getChatById(id));
        const allChats = await Promise.all(chatPromises);

        const aiChats = allChats.filter((c) => c.is_ai);
        setChats(aiChats);
      } catch (err) {
        console.error("Failed to fetch AI chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const createNewChat = async () => {
    try {
      const { id } = await api.createChat({ is_group: false, is_ai: true, name: null });
      setChats((prev) => [
        ...prev,
        { id, is_ai: true, is_group: false, name: `AI Chat ${prev.length + 1}`, created_at: Date.now() },
      ]);
    } catch (err) {
      console.error("Failed to create new AI chat:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-16 text-gray-500">Loading AI chats...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Chats</h1>
        <button
          onClick={createNewChat}
          className="btn btn-primary btn-sm"
        >
          + New Chat
        </button>
      </div>

      {/* Chat list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {chats.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No AI chats yet. Start one!</p>
        )}

        {chats.map((chat) => (
          <div
            key={chat.id}
            className="card card-bordered cursor-pointer hover:shadow-lg transition"
          >
            <div className="card-body flex items-center space-x-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                </div>
              </div>
              <div>
                <h2 className="card-title">{chat.name || `AI Chat #${chat.id}`}</h2>
                <p className="text-xs text-gray-400">
                  {new Date(chat.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIChats;
