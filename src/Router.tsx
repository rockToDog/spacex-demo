import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/home";
import Detail from "@/pages/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "detail/:id",
    element: <Detail />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
