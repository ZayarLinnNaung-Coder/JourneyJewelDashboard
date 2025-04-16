export const transportationRouter = [
  {
    path: "/transportations",
    lazy: async () => ({
      Component: (await import("@/page/transportations")).default,
    }),
  },
  {
    path: "/transportations/add",
    lazy: async () => ({
      Component: (await import("@/page/transportations/add-transportation")).default,
    }),
  },
  {
    path: "/transportations/edit/:id",
    lazy: async () => ({
      Component: (await import("@/page/transportations/edit-transportation")).default,
    }),
  },
];
