// src/types/chat.types.ts
// Chat interfaces
export interface Chat {
  id: number;
  name: string | null;
  is_group: boolean;
  is_ai: boolean;
  created_at: number;
}

// Members
export interface ChatMember {
  id: number;
  chat_id: number;
  user_id: number;
}

// Params / Body

// Get chats by user
export interface GetChatsByUserIdParams {
  user_id: number | string;
}

// Get chat by chat_id
export interface GetChatByIdParams {
  chat_id: number;
}

// Create a chat
export interface CreateChatBody {
  name?: string;
  is_group: boolean;
  is_ai?: boolean; // optional, default false
}

// Add member
export interface AddMemberBody {
  chat_id: number;
  user_id: number;
}

// Remove member
export interface RemoveMemberBody {
  chat_id: number;
  user_id: number;
}
/* ------------------------------
   Message content types
-------------------------------- */
export type MessageContentType = "text" | "qa" | "qa_parsed";

export interface BaseMessageContent {
  type: MessageContentType;
  created_at: number;
  is_ai: boolean;
}

export interface TextMessageContent extends BaseMessageContent {
  type: "text";
  message: string;
}

export interface UserQAMessageContent extends BaseMessageContent {
  type: "qa";
  question: string;
  answer: string;
}
export type QAErrorType =
  | "mis-simplification"
  | "sign error"
  | "wrong factoring"
  | "incorrect expansion"
  | "incorrect equation setup"
  | "wrong substitution"
  | "algebraic manipulation error"
  | "distribution mistake"
  | "exponent rule misuse"
  | "incorrect isolation of variable"
  | "wrong formula usage"
  | "diagram misunderstanding"
  | "incorrect angle reasoning"
  | "similarity misidentification"
  | "area formula misuse"
  | "perimeter/circumference confusion"
  | "identity misuse"
  | "wrong inverse trig usage"
  | "unit (degrees/radians) confusion"
  | "triangle setup error"
  | "basic addition error"
  | "basic subtraction error"
  | "basic multiplication error"
  | "basic division error"
  | "rounding error"
  | "mean/median confusion"
  | "wrong probability formula"
  | "misinterpretation of distribution"
  | "wrong prime factorization"
  | "modular arithmetic mistake"
  | "divisibility rule misunderstanding"
  | "gcd/lcm error"
  | "wrong answer"
  | "logic error"
  | "incomplete reasoning";

export interface QAAnswerCheck {
  in_answer: string;          // verbatim substring
  is_correct: boolean;
  error_type?: QAErrorType;   // only if incorrect
  weight?: number;            // 0–1, only if incorrect
}
export interface QAErrorSummary {
  type: QAErrorType;
  weight: number; // 0–1
}

export interface QAParsedMessageContent extends BaseMessageContent {
  type: "qa_parsed";

  question: string;

  // Step-by-step verification
  answer_checks: QAAnswerCheck[];

  // Overall judgment
  is_correct: boolean;

  topic:
    | "algebra"
    | "geometry"
    | "trigonometry"
    | "arithmetic"
    | "statistics"
    | "probability"
    | "number theory";

  // Aggregated errors (for DB + scoring)
  errors: QAErrorSummary[];

  score: number;       // 0–1
  confidence: number;  // 0–1

  conclusion: string;
}

export type MessageContent =
  | TextMessageContent
  | UserQAMessageContent
  | QAParsedMessageContent;

/* ------------------------------
   Messages
-------------------------------- */
export interface Message {
  id: number;
  chat_id: number;
  sender_id: number | null;
  is_ai: boolean;
  content_json: string; // store stringified MessageContent
  created_at: number; // unix timestamp
}

/* ------------------------------
   Send message body
-------------------------------- */
export interface SendMessageBody {
  chat_id: number;
  sender_id?: number | null; // null for AI
  is_ai: boolean;
  content: MessageContent; // now strongly typed
}

// Get messages by chat
export interface GetMessagesByChatIdParams {
  chat_id: number;
}
