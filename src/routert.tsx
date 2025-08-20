import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { teamRouter } from "./router/team.route";
import {placeRouter} from "./router/places.route.ts";
import { merchantRouter } from "./router/merchant.route";
import { deliveryMenRouter } from "./router/delivery-men";
import { manageServiceRouter } from "./router/manage-service";
import {transportationRouter} from "@/router/transportations.route.ts";
import {hotelRouter} from "@/router/hotels.route.ts";
import {packageRouter} from "@/router/package.route.ts";
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
        ...placeRouter,
        ...merchantRouter,
        ...deliveryMenRouter,
        ...manageServiceRouter,
        ...transportationRouter,
          ...hotelRouter,
          ...packageRouter
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
