import type { UserBaseType } from "./UserType";
import type { Course } from "./courseType";
export type Student = UserBaseType & {
  theme: string;
};

export type StudentProfileType = Student & {
  courses: Course[];
};
