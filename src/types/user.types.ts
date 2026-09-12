import type { Contact } from "./contact.types";

export type UserRole = "student" | "instructor";

export type UserBase = {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  bio?: string;
  description?: string;
  contact?: Contact;
};

export type UserRegisterForm = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: FileList;
  bio?: string;
  description?: string;
  contact: Contact;
};

export type UserDbPayload = Omit<UserBase, "userId"> & {
  password: string;
  avatar?: string | null;
};

export type UserState = Pick<
  UserBase,
  "userId" | "name" | "email" | "role"
> & {
  avatar?: string | null;
};

// Aliases for backward compatibility
export type UserBaseType = UserBase;
export type UserDbType = UserDbPayload;
export type UserStateType = UserState;
