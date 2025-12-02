// app/ai-chats/[id]/components/chatBubble.tsx

import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  content: string;
  senderName?: string;
  sentAt: Date | string;
  isAI?: boolean;
  isCurrentUser?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  senderName,
  sentAt,
  isAI = false,
  isCurrentUser = false,
}) => {
  const bubbleBg = isCurrentUser
    ? "bg-blue-500 text-white"
    : isAI
      ? "bg-gray-200 text-gray-900"
      : "bg-green-200 text-gray-900";

  const align = isCurrentUser ? "justify-end" : "justify-start";
  const roundedClass = isCurrentUser
    ? "rounded-tl-lg rounded-tr-lg rounded-bl-lg"
    : "rounded-tl-lg rounded-tr-lg rounded-br-lg";

  const displayName = isAI ? "AI" : senderName || "User";

  const formattedTime =
    typeof sentAt === "string"
      ? new Date(sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex ${align} mb-2`}>
      <div className={`p-3 max-w-xs md:max-w-md ${bubbleBg} ${roundedClass} shadow-md`}>
        <div className="text-xs font-semibold mb-1">{displayName}</div>
        <div className="prose prose-sm wrap-break-words">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="text-right text-[10px] text-gray-300 mt-1">{formattedTime}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
