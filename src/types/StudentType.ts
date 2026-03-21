import type { User } from "./UserType";
export type Student = User & {
  rank: number; // Student rank based on performance
  favoriteCategories: string[]; // Array of favorite course categories
};
