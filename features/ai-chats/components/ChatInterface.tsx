"use client";

import React, { useEffect, useState } from "react";
import {
  ApiClient,
  Message,
  User,
  TextMessageContent,
  UserQAMessageContent,
  mapServerMessageToClient
} from "@/shared/lib/api";
import { ChatOption } from "@/features/ai-chats/components/types/ChatOptionType";

import ChatMessages from "./ChatInterfaceMessages";
import ChatOptions from "./ChatOptions";
import ChatInputShell from "./ChatInputShell";
import TextInputMode from "./ChatInputs/TextInputMode";
import QAInputMode from "./ChatInputs/QAInputMode";

import { useRef } from "react";
import type { QAInputHandle } from "./ChatInputs/QAInputMode";

type ChatInputMode = "text" | "qa" | "quiz";

interface Props {
  chatId: number;
  currentUser: User;
  apiClient: ApiClient;
}

const ChatInterface: React.FC<Props> = ({ chatId, currentUser, apiClient }) => {
  const qaRef = useRef<QAInputHandle>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<ChatInputMode>("text");

  // Text mode
  const [input, setInput] = useState("");

  // QA mode
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<ChatOption[]>([]);

  /* ===================== LOAD MESSAGES ===================== */
  useEffect(() => {
    apiClient.getMessagesByChatId(chatId).then(setMessages);
  }, [apiClient, chatId]);
useEffect(() => {
  messages.forEach((m) => {
    console.log("MSG FROM API:", m.id, typeof m.content, m.content);
  });
}, [messages]);

  /* ===================== OPTIONS ===================== */
  useEffect(() => {
    setOptions([
      new ChatOption({
        id: "quick",
        label: "Quick Reply",
        icon: "📋",
        type: "button",
        section: 0,
        borderColor: "#34d399",
        backgroundColor: "#bbf7d0",
        textColor: "#065f46",
        onClick: () => {
          setMode("text");
          setInput("Explain this step by step.");
        },
      }),
      new ChatOption({
        id: "qa",
        label: "Q&A Mode",
        icon: "❓",
        type: "radio",
        section: 0,
        borderColor: "#60a5fa",
        backgroundColor: "#bfdbfe",
        textColor: "#1e3a8a",
        onClick: () => setMode("qa"),
      }),
      new ChatOption({
        id: "text",
        label: "Text Mode",
        icon: "💬",
        type: "radio",
        active: true,
        section: 0,
        borderColor: "#fbbf24",
        backgroundColor: "#fef3c7",
        textColor: "#78350f",
        onClick: () => setMode("text"),
      }),
    ]);
  }, []);

  /* ===================== SEND ===================== */
  const send = async () => {
  if (loading) return;

  // QA mode delegates fully
  if (mode === "qa") {
    qaRef.current?.send();
    return;
  }

  // ================= TEXT MODE =================
  if (!input.trim()) return;

  setLoading(true);

  try {
    const content: TextMessageContent = {
      type: "text",
      message: input,
      created_at: Date.now(),
      is_ai: false,
    };

    const userMessage: Message = {
      id: Date.now(),
      chat_id: chatId,
      sender_id: currentUser.id,
      is_ai: false,
      content,
      created_at: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await apiClient.sendMessage({
      chat_id: chatId,
      sender_id: currentUser.id,
      is_ai: false,
      content,
    });

    const aiResp = mapServerMessageToClient((await apiClient.getAIRespond({
      chat_id: chatId,
      content: content.message,
    })).message);
    console.log(aiResp);

    setMessages((prev) => [...prev, aiResp]);
  } finally {
    setLoading(false);
  }
};


  /* ===================== RENDER ===================== */
  return (
    <div className="flex flex-col h-full w-full">
      <ChatMessages messages={messages} currentUser={currentUser} />

      <div className="border-t-4 border-t-base-100">
        <ChatOptions
          show={showOptions}
          options={options}
          onTrigger={() => setOptions([...options])}
        />

        <ChatInputShell
          loading={loading}
          showOptions={showOptions}
          onSend={send}
          onToggleOptions={() => setShowOptions((v) => !v)}
        >
          {mode === "text" && (
            <TextInputMode
              value={input}
              loading={loading}
              onChange={setInput}
              onSend={send}
            />
          )}

          {mode === "qa" && (
            <QAInputMode
              ref={qaRef}
              apiClient={apiClient}
              chatId={chatId}
              currentUser={currentUser}
              question={question}
              answer={answer}
              onQuestionChange={setQuestion}
              onAnswerChange={setAnswer}
              setLoading={setLoading}
              addMessage={(msg) => setMessages((prev) => [...prev, msg])}
            />
          )}
        </ChatInputShell>
      </div>
    </div>
  );
};

export default ChatInterface;
