export interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
