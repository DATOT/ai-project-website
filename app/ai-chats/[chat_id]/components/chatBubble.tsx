// app/ai-chats/[id]/components/chatBubble.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // import KaTeX styles

interface ChatBubbleProps {
  content: string;
  senderName?: string;
  sentAt: Date | string;
  isAI?: boolean;
  isCurrentUser?: boolean;
}

function preProcessContent(content: string) {
  // Block math
  content = content.replace(/\\\[(([\s\S]*?))\\\]/g, `$$$\n$1\n$$$`);

  // Inline math
  content = content.replace(/\\\(([\s\S]*?)\\\)/g, `$$\n$1\n$$`);
  return content;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  senderName,
  sentAt,
  isAI = false,
  isCurrentUser = false,
}) => {
  const alignment = isCurrentUser ? "chat-end" : "chat-start";
  const bubbleType = isCurrentUser
    ? "chat-bubble chat-bubble-primary"
    : "chat-bubble chat-bubble-neutral";

  const displayName = isAI ? "AI" : senderName || "User";

  const formattedTime =
    typeof sentAt === "string"
      ? new Date(sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  console.log(content);
  return (
    <div className={`chat ${alignment} mb-2`}>
      <div className="chat-header mb-1 text-xs font-semibold">{displayName}</div>
      <div className={bubbleType}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {preProcessContent(content)}
        </ReactMarkdown>
        <div className="text-right text-[10px] text-gray-400 mt-1">{formattedTime}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
