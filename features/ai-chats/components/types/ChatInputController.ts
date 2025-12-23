export interface ChatInputController {
  canSend: boolean;
  getPayload(): {
    content: string;
    api: "text" | "qa" | "quiz";
  };
  reset(): void;
}
