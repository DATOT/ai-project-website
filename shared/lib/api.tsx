// shared/api.ts
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  is_teacher: boolean;
  created_at: number;
  bio?: string;
};

export type Chat = {
  chat_id: number;
  name: string | null;
  is_group: boolean;
  is_ai: boolean;
  created_at: number;
};

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

export interface QAParsedMessageContent extends BaseMessageContent {
  type: "qa_parsed";
  question: string;
  answer_checks: {
    in_answer: string;
    is_correct: boolean;
    error_type?: "spelling" | "grammar" | "logic" | "missing" | "other";
  }[];
  conclusion: string;
}

export type UserTeacher = {
  teacher_id: number;
  teacher_username: string;
  created_at: number;
};

export type TeacherStudent = {
  id: number;
  username: string;
  name: string;
  email: string;
};

import { Message as MessageServer } from "@backend/types/chat.types"
export function mapServerMessageToClient(
  msg: MessageServer
): Message {
  let content: MessageContent;

  try {
    content = JSON.parse(msg.content_json);
  } catch (e) {
    console.error("Failed to parse content_json", msg);
    content = {
      type: "text",
      message: "[Invalid message]",
      created_at: msg.created_at,
      is_ai: msg.is_ai,
    };
  }

  return {
    id: msg.id,
    chat_id: msg.chat_id,
    sender_id: msg.sender_id,
    is_ai: msg.is_ai,
    content,
    created_at: msg.created_at,
  };
}

export type MessageContent =
  | TextMessageContent
  | UserQAMessageContent
  | QAParsedMessageContent;

export type Message = {
  id: number;
  chat_id: number;
  sender_id: number | null;
  is_ai: boolean;
  content: MessageContent; // parsed JSON
  created_at: number;
};

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = "http://127.0.0.1:5000") {
    this.baseUrl = baseUrl;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error(err);
      throw new Error(err.error || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  // ================= Users =================

  async getUsers(): Promise<User[]> {
    return this.request("/users");
  }

  async getUserById(id: number): Promise<User> {
    return this.request(`/users/id/${id}`);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.request(`/users/user/${username}`);
  }

  async registerUser(data: {
    username: string;
    password: string;
    email: string;
    name?: string;
    is_teacher?: boolean;
  }): Promise<User> {
    return this.request("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async loginUser(data: { username: string; password: string }): Promise<{ token: string; user: User }> {
    const result = await this.request<{ token: string; user: User }>("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    this.setToken(result.token);
    return result;
  }

  async logoutUser() {
    localStorage.setItem("token", "");
    this.setToken("");
  }

  async currentUser(): Promise<User> {
    return this.request("/me");
  }

  // ================= Chats =================

  /* ---------------- Chats ---------------- */

  async getChatsByUserId(user_id: number): Promise<{ chat_ids: number[] }> {
    return this.request(`/users/${user_id}/chats`);
  }

  async getChatById(chat_id: number): Promise<Chat> {
    return this.request(`/chats/${chat_id}`);
  }

  async createChat(data: { name?: string; is_group: boolean; is_ai?: boolean }): Promise<{ id: number }> {
    return this.request("/chats", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async addMemberToChat(data: { chat_id: number; user_id: number }): Promise<{ id: number }> {
    return this.request(`/chats/${data.chat_id}/members`, {
      method: "POST",
      body: JSON.stringify({ user_id: data.user_id }),
    });
  }

  async removeMemberFromChat(data: { chat_id: number; user_id: number }): Promise<{ deleted: number }> {
    return this.request(`/chats/${data.chat_id}/members/${data.user_id}`, {
      method: "DELETE",
    });
  }

  /* ---------------- Messages ---------------- */

  async getMessagesByChatId(chat_id: number): Promise<Message[]> {
    const res = await this.request<{ messages: Message[] }>(`/chats/${chat_id}/messages`);
    return res.messages;
  }

  async sendMessage(data: {
    chat_id: number;
    sender_id?: number | null;
    is_ai: boolean;
    content: MessageContent;
  }): Promise<{ id: number }> {
    return this.request(`/chats/${data.chat_id}/messages`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAIRespond(data: { chat_id: number; content: string }): Promise<{ message: MessageServer }> {
    return this.request("/ai/respond", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }


  async checkQA(data: { user_id: number; chat_id: number; question: string, answer: string }): Promise<{ message: MessageServer }> {
    return this.request("/ai/checkqa", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async AIAnalyze(data: { user_id: number, student_answer: string; ai_answer: string }): Promise<{ message: MessageServer }> {
    return this.request("/ai/analyze", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAIAnalysis(data: { user_id: number }): Promise<{ analyses: unknown[] }> {
    return this.request(`/ai/analysis/get/${data.user_id}`);
  }

  // Get my teachers
  async getMyTeachers(): Promise<UserTeacher[]> {
    return this.request("/me/teachers");
  }

  // Assign a teacher to me
  async assignTeacher(teacher_id: number): Promise<UserTeacher> {
    return this.request("/me/teachers", {
      method: "POST",
      body: JSON.stringify({ teacher_id }),
    });
  }

  // Remove a teacher from me
  async removeTeacher(teacherId: number): Promise<{ success: true }> {
    return this.request(`/me/teachers/${teacherId}`, {
      method: "DELETE",
    });
  }

  // Get students of the logged-in teacher
  async getMyStudents(): Promise<TeacherStudent[]> {
    return this.request("/me/students");
  }

  // Get students by teacher id (public / admin use)
  async getStudentsByTeacherId(teacherId: number): Promise<TeacherStudent[]> {
    return this.request(`/teachers/${teacherId}/students`);
  }
}

export function createApi() {
  const api = new ApiClient("http://127.0.0.1:5000");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) api.setToken(token);

  return api;
}
