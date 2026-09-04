import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Courses } from "../pages/Courses";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ProtectedDashboard } from "../pages/ProtectedDashboardRoute";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import { FullCourseDetailsPage } from "../pages/FullCoursePage";
import { AboutUs } from "../pages/AboutUs";
import UploadPDF from "../pages/PdfUpload";
import { RouteErrorFallback } from "../components/RouteErrorFallback";
import { LessonLearningPage } from "../pages/LessonLearningPage";
import CreateLesson from "../pages/instructurDashboardComponents/CreateLesson";

export function MainRouter() {
  // Route-level fallbacks prevent render errors from showing React Router's default crash page.
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <RouteErrorFallback />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "courses/:id",
          element: <CourseDetailsPage />,
        },
        {
          path: "courses/:id/learn",
          element: <LessonLearningPage />,
        },
        {
          path: "instructor/courses/:id",
          element: <FullCourseDetailsPage />,
        },
        {
          path: "instructor/courses/:id/lessons/create",
          element: <CreateLesson />,
        },
        {
          path: "aboutus",
          element: <AboutUs />,
        },
        {
          path: "resources/pdf",
          element: <UploadPDF />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <RouteErrorFallback />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <RouteErrorFallback />,
    },
    {
      path: "/dashboard",
      element: <ProtectedDashboard />,
      errorElement: <RouteErrorFallback />,
    },
  ]);
  return <RouterProvider router={router} />;
}
