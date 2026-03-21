import type { Course } from "../types/courseType";
export const courses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    description:
      "Learn the basics of React including components, hooks, and state.",
    instructor: "John Doe",
    category: "Frontend",
    level: "Beginner",
    duration: 6.5, // in hours and fraction represents minutes (0.5 = 30 minutes)
    image: "/images/react.jpg",
    rating: 4.5,
    price: 0,
    language: "English",
    instructorId: 1,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description:
      "Master advanced patterns like render props, hooks, and performance optimization.",
    instructor: "Jane Smith",
    category: "Frontend",
    level: "Advanced",
    duration: 8.33, // in hours
    image: "/images/react-advanced.jpg",
    rating: 4.8,
    price: 49,
    language: "English",
    instructorId: 2,
  },
  {
    id: 3,
    title: "Data Science with Python",
    description:
      "Learn data analysis, visualization, and machine learning basics.",
    instructor: "Michael Lee",
    category: "Data Science",
    level: "Intermediate",
    duration: 10.3, // in hours
    image: "/images/ds.jpg",
    rating: 4.6,
    price: 59,
    language: "English",
    instructorId: 3,
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    description: "Understand design principles, wireframing, and prototyping.",
    instructor: "Sarah Wilson",
    category: "Design",
    level: "Beginner",
    duration: 5.5, // in hours
    image: "/images/design.jpg",
    rating: 4.3,
    price: 29,
    language: "English",
    instructorId: 4,
  },
];
