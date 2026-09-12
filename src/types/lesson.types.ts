export type Lesson = {
  lesson_id: string;
  course_id: string;
  title: string;
  content: string;
  order: number;
  estimatedMinutes: number;
  completed?: boolean;
};

export type CourseProgress = {
  courseId: string;
  completedCount: number;
  totalLessons: number;
  courseCompleted: boolean;
  progress: number;
};

export type StudentLessonsResponse = {
  lessons: Lesson[];
  progress: CourseProgress;
};

export type LessonFormData = {
  title: string;
  content: string;
  estimatedMinutes: number;
};
