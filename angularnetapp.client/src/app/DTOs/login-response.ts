export interface ILoginResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
