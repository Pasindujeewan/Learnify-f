import type { UserBase } from "./user.types";
import type { InstructorCourseType } from "./course.types";

export type Instructor = UserBase & {
  role: "instructor";
  rating?: number;
  experience?: number;
  expertise?: string[];
  password?: string;
};

export type InstructorProfileType = Instructor & {
  courses: InstructorCourseType[];
};

// Backward compatibility alias
export type instructorProfileType = InstructorProfileType;
