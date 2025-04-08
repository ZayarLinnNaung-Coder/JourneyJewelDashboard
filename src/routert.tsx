import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { teamRouter } from "./router/team.route";
import { wayRouter } from "./router/ways.route";
import { merchantRouter } from "./router/merchant.route";
import { deliveryMenRouter } from "./router/delivery-men";
import { manageServiceRouter } from "./router/manage-service";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/team"} replace />,
    },
    {
      path: "/",
      lazy: async () => ({
        Component: (await import("@/layout/main.layout")).default,
      }),
      children: [
        ...teamRouter,
        ...wayRouter,
        ...merchantRouter,
        ...deliveryMenRouter,
        ...manageServiceRouter,
      ],
    },
    {
      path: "/login",
      lazy: async () => ({
        Component: (await import("@/page/auth/login")).default,
      }),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
