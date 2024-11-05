export interface User {
  _id: string;
  username: string;
  email: string;
  role: "client" | "freelancer";
  password: string;
}