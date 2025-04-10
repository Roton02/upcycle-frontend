export interface IUser {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
