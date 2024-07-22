export interface UserState {
  isLoading: boolean | null;
  isSuccess: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  message: string | null | undefined;
  user: User | null;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  createdAt?: string;
}

export interface Login {
  email: string;
  password: string;
}
