export type Level = "Beginner" | "Intermediate" | "Advanced";
type Language = "English" | "Spanish" | "French" | "German";

export type Duration =
  | "Less than 1 hour"
  | "1-3 hours"
  | "3-6 hours"
  | "More than 6 hours";

type Price = "Free" | "Paid";

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
  instructor: string;
  instructorId: number;
  category: Category;
  level: Level;
  duration: number; // in hours and fraction represents minutes (0.5 = 30 minutes)
  imageUrl: string;
  rating: number;
  price: number; // in USD
  language: Language;
  instructorName: string;
};

export type StudentCourseType = Course & {
  status: "completed" | "in-progress";
};

export type InstructorCourseType = Course & {
  enrolled_students: number;
  createdAt: string | Date; // ISO date string
};

export type courseFilters = {
  level: Level[];
  category: Category[];
  language: Language[];
  duration: Duration[];
  price: Price[];
};
export type CourseFormData = Omit<
  Course,
  "course_id" | "instructorName" | "rating"
>;
