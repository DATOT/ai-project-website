"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import {
  ApiClient,
  Message,
  User,
  UserQAMessageContent,
  mapServerMessageToClient,
} from "@/shared/lib/api";

export interface QAInputHandle {
  send: () => void;
}

interface Props {
  apiClient: ApiClient;
  chatId: number;
  currentUser: User;
  addMessage: (msg: Message) => void;
  setLoading: (loading: boolean) => void;

  question: string;
  answer: string;
  onQuestionChange: (v: string) => void;
  onAnswerChange: (v: string) => void;
}

const QAInputMode = forwardRef<QAInputHandle, Props>(
  (
    {
      apiClient,
      chatId,
      currentUser,
      addMessage,
      setLoading,
      question,
      answer,
      onQuestionChange,
      onAnswerChange,
    },
    ref
  ) => {
    const handleSend = async () => {
      if (!question.trim() || !answer.trim()) return;

      setLoading(true);

      try {
        const content: UserQAMessageContent = {
          type: "qa",
          question,
          answer,
          created_at: Date.now(),
          is_ai: false,
        };

        const userMsg: Message = {
          id: Date.now(),
          chat_id: chatId,
          sender_id: currentUser.id,
          is_ai: false,
          content,
          created_at: Date.now(),
        };

        addMessage(userMsg);

        await apiClient.sendMessage({
          chat_id: chatId,
          sender_id: currentUser.id,
          is_ai: false,
          content,
        });

        const aiResponse = await apiClient.checkQA({
          user_id: currentUser.id,
          chat_id: chatId,
          question,
          answer,
        });
        console.log(aiResponse);

        addMessage(mapServerMessageToClient(aiResponse.message));
      } finally {
        setLoading(false);
        onQuestionChange("");
        onAnswerChange("");
      }
    };

    useImperativeHandle(ref, () => ({
      send: handleSend,
    }));

    return (
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center">
          <p className="pr-2 font-bold w-40">Question:</p>
          <textarea
            className="textarea textarea-bordered w-full pl-2 resize-none max-h-40"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
          />
        </div>
        <div className="divider" />
        <div className="flex items-center">
          <p className="pr-2 font-bold w-40">Your answer:</p>
          <textarea
            className="textarea textarea-bordered w-full pl-2 resize-none max-h-80"
            placeholder="Your answer..."
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            rows={3}
          />
        </div>
      </div>
    );
  }
);

QAInputMode.displayName = "QAInputMode";

export default QAInputMode;
