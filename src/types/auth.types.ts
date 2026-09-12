export type LoginForm = {
  email: string;
  password: string;
};

export type CourseRating = {
  rating: number;
  comment: string;
  courseId: string;
};

// Backward compatibility alias
export type CourseRatingType = CourseRating;
