export const wayRouter = [
  {
    path: "/ways",
    lazy: async () => ({
      Component: (await import("@/page/ways")).default,
    }),
  },
  {
    path: "/ways/add",
    lazy: async () => ({
      Component: (await import("@/page/ways/add-ways")).default,
    }),
  },
];
