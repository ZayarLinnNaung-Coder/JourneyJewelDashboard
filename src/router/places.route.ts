export const placeRouter = [
  {
    path: "/places",
    lazy: async () => ({
      Component: (await import("@/page/places")).default,
    }),
  },
  {
    path: "/places/add",
    lazy: async () => ({
      Component: (await import("@/page/places/add-place")).default,
    }),
  },
  {
    path: "/places/edit/:id",
    lazy: async () => ({
      Component: (await import("@/page/places/edit-place")).default,
    }),
  },
];
