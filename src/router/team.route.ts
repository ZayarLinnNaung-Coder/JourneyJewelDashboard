export const teamRouter = [
  {
    path: "/team",
    lazy: async () => ({
      Component: (await import("@/page/team")).default,
    }),
  },
  {
    path: "/team/add-team",
    lazy: async () => ({
      Component: (await import("@/page/team/add-team")).default,
    }),
  },
  {
    path: "/team/edit-team/:id",
    lazy: async () => ({
      Component: (await import("@/page/team/edit-team")).default,
    }),
  },
  {
    path: "/role",
    lazy: async () => ({
      Component: (await import("@/page/role")).default,
    }),
  },
  {
    path: "/role/add-role",
    lazy: async () => ({
      Component: (await import("@/page/role/add-role")).default,
    }),
  },
  {
    path: "/role/edit-role/:id",
    lazy: async () => ({
      Component: (await import("@/page/role/edit-role")).default,
    }),
  },
  {
    path: "/role/remove-role/:id",
    lazy: async () => ({
      Component: (await import("@/page/role/remove-role")).default,
    }),
  },
];
