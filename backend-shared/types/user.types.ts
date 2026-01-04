// src/types/user.types.ts
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  created_at: Date;
  is_teacher: boolean;
  bio: string;
  password_hash: string;
}

export interface SafeUser {
  id: number;
  name: string;
  username: string;
  is_teacher: boolean;
  created_at: Date;
  email: string;
  bio: string;
}

export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  name: string;
  is_teacher: boolean;
}

export interface LoginUserBody {
  username: string;
  password: string;
}

export interface GetUserByIdParams {
  id: number;
}

export interface GetUserByUsernameParams {
  username: string;
}
