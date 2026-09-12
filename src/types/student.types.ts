import type { UserBase } from "./user.types";
import type { StudentCourseType, EnrolledStudentShort } from "./course.types";

export type Student = UserBase & {
  role: "student";
  education_level?: string;
};

export type StudentProfileType = Student & {
  courses: StudentCourseType[];
};

export type enrolledStudentShort = EnrolledStudentShort;
