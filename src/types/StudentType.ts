import type { UserBaseType } from "./UserType";
import type { StudentCourseType } from "./courseType";
export type Student = UserBaseType & {
  education_level: string;
  avatar?: string | null;
};

export type StudentProfileType = Student & {
  courses: StudentCourseType[];
};

export type enrolledStudentShort = Omit<
  StudentProfileType,
  "education_level" | "contact" | "bio" | "description" | "role" | "courses"
>;
