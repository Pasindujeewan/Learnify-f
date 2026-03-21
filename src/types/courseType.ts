export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Category = "Frontend" | "Data Science" | "Design";

export type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorId: number;
  category: Category;
  level: Level;
  duration: number; // in hours and fraction represents minutes (0.5 = 30 minutes)
  image: string;
  rating: number;
  price: number; // in USD
  language: string;
};
