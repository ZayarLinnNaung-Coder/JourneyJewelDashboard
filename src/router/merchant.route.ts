export const merchantRouter = [
  {
    path: "/merchants",
    lazy: async () => ({
      Component: (await import("@/page/merchants")).default,
    }),
  },
  {
    path: "/merchants/add-merchant",
    lazy: async () => ({
      Component: (await import("@/page/merchants/add-merchant")).default,
    }),
  },
  {
    path: "/merchants/edit-merchant/:id",
    lazy: async () => ({
      Component: (await import("@/page/merchants/edit-merchant/edit-merchant"))
        .default,
    }),
  },
];
