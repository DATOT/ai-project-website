// src/types/ai.types.ts
export interface AIRespondRequestBody {
  chat_id: number;
  content: string; // the user's message
}

export interface AnalyzeRequestBody {
  question: string;
  user_id: number;
  student_answer: string;
  ai_answer: string;
}

export interface AnalysisByUserRequestParams {
  user_id: number;
}

export interface CheckQARequestBody {
  user_id: number;
  chat_id: number;
  question: string;
  answer: string;
}