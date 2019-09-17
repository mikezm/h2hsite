interface AuthData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  id: string;
  user_role: string;
  expires_in: number;
}

export { AuthData, LoginResponse }