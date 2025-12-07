"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./chatBubble";
import { ApiClient, Message, User } from "@/shared/lib/api";

interface ChatInterfaceProps {
  chatId: number;
  currentUser: User;
  apiClient: ApiClient;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatId, currentUser, apiClient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages initially
  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await apiClient.getMessagesByChatId(chatId);
      setMessages(msgs);
      scrollToBottom();
    };
    fetchMessages();
  }, [chatId]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Send user message
    const newMsg = await apiClient.sendMessage({
      chat_id: chatId,
      sender_id: currentUser.id,
      is_ai: false,
      content: input,
    });

    // Add locally for instant UI update
    const userMessage: Message = {
      id: newMsg.id,
      chat_id: chatId,
      sender_id: currentUser.id,
      is_ai: false,
      content: input,
      created_at: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    scrollToBottom();

    // Get AI response
    try {
      const aiRes = await apiClient.getAIRespond({
        chat_id: chatId,
        content: input,
      });

      // console.log("AI Res:", aiRes.message); // AI Res: undefined
      setMessages((prev) => [...prev, aiRes.message]);
      scrollToBottom();

      apiClient.AIAnalyze({ user_id: currentUser.id, student_answer: input, ai_answer: aiRes.message.content }).catch((err) => console.error("AIAnalyze failed:", err));;
    } catch (err) {
      console.error("AI respond error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Enter key send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.content}
            senderName={msg.is_ai ? "AI" : currentUser.username}
            sentAt={new Date(msg.created_at)}
            isAI={msg.is_ai}
            isCurrentUser={!msg.is_ai && msg.sender_id === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder={loading ? "Waiting for AI..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered flex-1"
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
