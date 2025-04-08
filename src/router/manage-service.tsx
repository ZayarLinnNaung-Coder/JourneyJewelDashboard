export const manageServiceRouter = [
  {
    path: "/zone",
    lazy: async () => ({
      Component: (await import("@/page/zone")).default,
    }),
  },
  {
    path: "/zone/create",
    lazy: async () => ({
      Component: (await import("@/page/zone/create-zone")).default,
    }),
  },
  {
    path: "/zone/update/:id",
    lazy: async () => ({
      Component: (await import("@/page/zone/update-zone")).default,
    }),
  },
];
