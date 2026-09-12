import type { Lesson } from "./lesson.types";

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Language = "English" | "Spanish" | "French" | "German";

export type DurationOption =
  | "Less than 1 hour"
  | "1-3 hours"
  | "3-6 hours"
  | "More than 6 hours";

// Backward compatibility alias
export type Duration = DurationOption;

export type PriceOption = "Free" | "Paid";

export type Category =
  | "Frontend"
  | "Data Science"
  | "Design"
  | "Programming"
  | "Web Development"
  | "Mobile Development"
  | "Game Development"
  | "AI & Machine Learning"
  | "Cloud Computing"
  | "Cybersecurity"
  | "DevOps"
  | "Other";

export type Course = {
  course_id: string;
  title: string;
  description: string;
  instructor?: string;
  instructorId?: number;
  category: Category;
  level: Level;
  duration: number; // in hours
  imageUrl: string;
  rating: number;
  price: number; // in USD
  language: Language;
  instructorName: string;
  enrolledCount?: number;
};

export type StudentCourseType = Course & {
  status: "completed" | "in-progress";
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  courseCompleted?: boolean;
};

export type InstructorCourseType = Course & {
  enrolledStudents: number;
  createdAt: string | Date;
  lessons?: Lesson[];
};

export type CourseFilters = {
  level: Level[];
  category: Category[];
  language: Language[];
  duration: DurationOption[];
  price: PriceOption[];
};

// Backward compatibility alias
export type courseFilters = CourseFilters;

export type CourseFormData = Omit<
  Course,
  | "course_id"
  | "instructor"
  | "instructorId"
  | "instructorName"
  | "rating"
  | "enrolledCount"
>;

export type EnrolledStudentShort = {
  userId: number;
  name: string;
  email: string;
  avatar?: string | null;
};

export type FullCourseType = Course & {
  enrolledstudents: EnrolledStudentShort[];
  lessons?: Lesson[];
};
