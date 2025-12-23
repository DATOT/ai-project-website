import React from "react";
import { ChatOption } from "@/features/ai-chats/components/types/ChatOptionType";

interface Props {
  show: boolean;
  options: ChatOption[];
  onTrigger: () => void;
}

const ChatOptions: React.FC<Props> = ({ show, options, onTrigger }) => {
  // group options by section
  const sections: Record<number, ChatOption[]> = {};
  options.forEach((opt) => {
    const sec = opt.section ?? 0;
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(opt);
  });

  return (
    <div
      className={`
        overflow-hidden
        transition-[max-height,opacity]
        duration-250 ease-out
        ${show ? "max-h-[60px] opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="flex flex-wrap gap-2 p-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={opt.buttonClass}
            style={opt.style}
            onClick={() => {
              const optionsInSection = sections[opt.section ?? 0];
              opt.trigger(optionsInSection);
              onTrigger();
            }}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              {opt.icon}
            </span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatOptions;
