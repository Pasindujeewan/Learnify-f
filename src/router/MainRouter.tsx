import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Courses } from "../pages/Courses";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ProtectedDashboard } from "../pages/ProtectedDashboardRoute";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import { FullCourseDetailsPage } from "../pages/FullCoursePage";
export function MainRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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
          path: "instructor/courses/:id",
          element: <FullCourseDetailsPage />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <ProtectedDashboard />,
    },
  ]);
  return <RouterProvider router={router} />;
}
