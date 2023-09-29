import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/home.tsx";
import { Error } from "@/pages/error.tsx";
import { Identification } from "@/pages/identification.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/:token",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/identification/:identificationId",
    element: <Identification />,
  },
]);
