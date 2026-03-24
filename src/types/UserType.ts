import type { Contact } from "./ContactType";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: FileList; // URL to profile picture
  role: "student" | "instructor";
  bio?: string;
  description?: string;
  contact: Contact;
};

export type UserForm = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string | null; // URL to profile picture
  role: "student" | "instructor";
  bio?: string;
  description?: string;
  contact: Contact;
};
