export const packageRouter = [
  {
    path: "/packages",
    lazy: async () => ({
      Component: (await import("@/page/package")).default,
    }),
  },
  {
    path: "/packages/add",
    lazy: async () => ({
      Component: (await import("@/page/package/add-package")).default,
    }),
  },
  {
    path: "/packages/edit/:id",
    lazy: async () => ({
      Component: (await import("@/page/package/edit-package")).default,
    }),
  },
];
