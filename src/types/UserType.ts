import type { Contact } from "./ContactType";

export type UserBaseType = {
  userId: number;
  name: string;
  email: string;
  role: "student" | "instructor";
  bio?: string;
  description?: string;
  contact: Contact;
};

export type UserDbType = Omit<UserBaseType, "user_id"> & {
  avatar?: string | null; // URL to profile picture
  password: string;
};
export type UserRegisterForm = Omit<UserBaseType, "user_id"> & {
  avatar?: FileList; // For file upload in registration form
  password: string;
};
