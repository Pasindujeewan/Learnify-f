import type { Contact } from "./ContactType";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "student" | "instructor";
  bio?: string;
  description?: string;
  contact: Contact;
};
