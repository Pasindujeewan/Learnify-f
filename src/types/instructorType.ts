import type { UserDbType } from "./UserType";
import type { Course } from "./courseType";
export type Instructor = UserDbType & {
  rating: number;
  experience: number; // in years
  expertise: string[];
};

export type instructorProfileType = Instructor & {
  courses: Course[];
};
