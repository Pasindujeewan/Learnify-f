import type { User } from "./UserType";
export type Instructor = User & {
  rating: number;
  experience: number; // in years
  expertise: string[];
};
