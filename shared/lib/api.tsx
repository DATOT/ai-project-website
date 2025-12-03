// shared/api.ts
export type User = {
  id: number;
  username: string;
  email: string;
  is_teacher: boolean;
  created_at: number;
  bio?: string;
};

export type Chat = {
  id: number;
  name: string | null;
  is_group: boolean;
  is_ai: boolean;
  created_at: number;
};

export type Message = {
  id: number;
  chat_id: number;
  sender_id: number | null;
  is_ai: boolean;
  content: string;
  created_at: number;
};

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = "http://localhost:5000") {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
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
      console.log(err);
      console.log(res.json);
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
    localStorage.setItem("token", result.token);
    this.setToken(result.token);
    return result;
  }

  async logoutUser() {
    localStorage.setItem("token", "");
    this.setToken("");
  }

  async currentUser(): Promise<User> {
    let res = await this.request("/me");
    console.log(res);
    return this.request("/me");
  }

  // ================= Chats =================

  async getChatsByUserId(user_id: number): Promise<{ chat_ids: number[] }> {
    return this.request(`/chats/user/${user_id}`);
  }

  async getChatById(chat_id: number): Promise<Chat> {
    return this.request(`/chats/${chat_id}`);
  }

  async createChat(data: { name?: string | null; is_group: boolean; is_ai?: boolean }): Promise<{ id: number }> {
    return this.request("/chats/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async addMemberToChat(data: { chat_id: number; user_id: number }): Promise<{ id: number }> {
    return this.request("/chats/add-member", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async removeMemberFromChat(data: { chat_id: number; user_id: number }): Promise<{ deleted: number }> {
    return this.request("/chats/remove-member", {
      method: "DELETE",
      body: JSON.stringify(data),
    });
  }

  async getMessagesByChatId(chat_id: number): Promise<Message[]> {
    return this.request(`/chats/${chat_id}/messages`);
  }

  async sendMessage(data: { chat_id: number; sender_id?: number | null; is_ai: boolean; content: string }): Promise<{ id: number }> {
    return this.request("/chats/send-message", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAIRespond(data: { chat_id: number; content: string }): Promise<{ message: Message }> {
    return this.request("/ai/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}

export function createApi() {
  const api = new ApiClient("http://localhost:5000");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) api.setToken(token);

  return api;
}
