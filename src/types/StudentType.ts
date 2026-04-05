import type { UserBaseType } from "./UserType";
import type { StudentCourseType } from "./courseType";
export type Student = UserBaseType & {
  theme: string;
};

export type StudentProfileType = Student & {
  courses: StudentCourseType[];
};
