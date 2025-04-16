export const hotelRouter = [
  {
    path: "/hotels",
    lazy: async () => ({
      Component: (await import("@/page/hotels")).default,
    }),
  },
  {
    path: "/hotels/add",
    lazy: async () => ({
      Component: (await import("@/page/hotels/add-hotels")).default,
    }),
  },
  {
    path: "/hotels/edit/:id",
    lazy: async () => ({
      Component: (await import("@/page/hotels/edit-hotels")).default,
    }),
  },
];
