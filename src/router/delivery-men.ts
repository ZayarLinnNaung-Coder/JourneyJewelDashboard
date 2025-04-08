export const deliveryMenRouter = [
  {
    path: "/delivery-men",
    lazy: async () => ({
      Component: (await import("@/page/delivery-men")).default,
    }),
  },
  {
    path: "/delivery-men/add",
    lazy: async () => ({
      Component: (await import("@/page/delivery-men/add-delivery-men")).default,
    }),
  },
];
