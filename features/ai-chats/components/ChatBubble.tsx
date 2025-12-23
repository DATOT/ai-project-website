import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { MessageContent } from "@/shared/lib/api";

interface ChatBubbleProps {
  content: MessageContent;
  senderName?: string;
  sentAt: Date | string;
  isCurrentUser?: boolean;
  isAI?: boolean;
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
  isAI,
  isCurrentUser = false,
}) => {
  const alignment = isCurrentUser ? "chat-end" : "chat-start";
  const bubbleType = isCurrentUser
    ? "chat-bubble chat-bubble-primary"
    : "chat-bubble chat-bubble-neutral";
  //console.log(content);
  const displayName = isAI ? "AI" : senderName || "User";

  const formattedTime =
    typeof sentAt === "string"
      ? new Date(sentAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* ===================== RENDER BASED ON TYPE ===================== */

  if (content.type === "text") {
    return (
      <div className={`chat ${alignment} mb-2`}>
        <div className="chat-header mb-1 text-xs font-semibold">
          {displayName}
        </div>
        <div className={bubbleType}>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {preProcessContent(content.message)}
          </ReactMarkdown>
          <div className="text-right text-[10px] text-gray-400 mt-1">
            {formattedTime}
          </div>
        </div>
      </div>
    );
  }

  if (content.type === "qa") {
    return (
      <div className={`chat ${alignment} mb-2`}>
        <div className="chat-header mb-1 text-xs font-semibold">
          {displayName}
        </div>
        <div className={bubbleType}>
          <div className="font-bold mb-1">Question:</div>
          <div className="whitespace-pre-wrap mb-2">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {preProcessContent(content.question)}
            </ReactMarkdown>
          </div>

          <div className="font-bold mb-1">My Answer:</div>
          <div className="whitespace-pre-wrap">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {preProcessContent(content.answer)}
            </ReactMarkdown>
          </div>

          <div className="text-right text-[10px] text-gray-400 mt-1">
            {formattedTime}
          </div>
        </div>
      </div>
    );
  }

  if (content.type === "qa_parsed") {
    return (
      <div className={`chat ${alignment} mb-2`}>
        <div className="chat-header mb-1 text-xs font-semibold">
          {displayName}
        </div>
        <div className={bubbleType}>
          <div className="font-bold mb-1">Question:</div>
          <div className="whitespace-pre-wrap mb-2">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content.question}
            </ReactMarkdown>
          </div>

          <div className="font-bold mb-1">Answer Checks:</div>

          <ul className="list-disc ml-4 mb-2">
            {content.answer_checks.map((a, i) => (
              <li
                key={i}
                className={a.is_correct ? "text-green-600" : "text-red-600"}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {
                    a.in_answer +
                      " " +
                      (a.is_correct ? "✅" : `❌ (${a.error_type})`)
                  }
                </ReactMarkdown>
              </li>
            ))}
          </ul>

          <hr className="my-2 border-t-gray-300" />

          <div className="font-bold">Conclusion:</div>
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content.conclusion}
            </ReactMarkdown>
          </div>

          <div className="text-right text-[10px] text-gray-400 mt-1">
            {formattedTime}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatBubble;
