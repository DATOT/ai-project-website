"use client";

import React from "react";
import OptionsToggleButton from "./OptionsToggleButton";

interface Props {
  loading: boolean;
  showOptions: boolean;
  onSend: () => void;
  onToggleOptions: () => void;
  children: React.ReactNode;
}

const ChatInputShell: React.FC<Props> = ({
  loading,
  showOptions,
  onSend,
  onToggleOptions,
  children,
}) => {
  return (
    <div
      className={`
        p-3 flex gap-2 items-center
        transition-colors
      `}
    >
      <OptionsToggleButton active={showOptions} onClick={onToggleOptions} />

      {/* Input mode goes here */}
      <div className="flex-1">{children}</div>

      <button
        className="btn btn-primary btn-circle"
        onClick={onSend}
        disabled={loading}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatInputShell;
