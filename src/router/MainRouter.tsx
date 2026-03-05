import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
export function MainRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);
  return <RouterProvider router={router} />;
}
