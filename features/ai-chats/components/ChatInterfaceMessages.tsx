"use client";

import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { Message, User } from "@/shared/lib/api";

interface Props {
  messages: Message[];
  currentUser: User;
}

const ChatMessages: React.FC<Props> = ({ messages, currentUser }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => {
        const isCurrentUser = !msg.is_ai && msg.sender_id === currentUser.id;
        //console.log(msg)
        return (
          <ChatBubble
            key={msg.id}
            content={msg.content}
            senderName={msg.is_ai ? "AI" : currentUser.username}
            sentAt={new Date(msg.created_at)}
            isCurrentUser={isCurrentUser}
            isAI={msg.is_ai}
          />
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
