import type { UserDbType } from "./UserType";
import type { InstructorCourseType } from "./courseType";
export type Instructor = UserDbType & {
  rating: number;
  experience: number; // in years
  expertise: string[];
};

export type instructorProfileType = Instructor & {
  courses: InstructorCourseType[];
};
