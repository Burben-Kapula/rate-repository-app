export interface User {
  id: string;
  username: string;
}

export interface AuthenticateInput {
  username: string;
  password: string;
}

export interface AuthenticateResult {
  accessToken: string;
}
