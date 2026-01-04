"use client";

import React, { useEffect, useRef } from "react";

const MAX_HEIGHT = 160;

interface Props {
  value: string;
  loading: boolean;
  onChange: (v: string) => void;
  onSend: () => void;
}

const TextInputMode: React.FC<Props> = ({
  value,
  loading,
  onChange,
  onSend,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + "px";
  }, [value]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={loading ? "Waiting for AI..." : "Type your message..."}
      className="textarea textarea-bordered w-full resize-none max-h-40"
      rows={1}
      disabled={loading}
    />
  );
};

export default TextInputMode;
