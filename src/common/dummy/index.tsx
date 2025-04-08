import IconManageUser from "../icon/IconManageUser";
import IconManageWay from "../icon/IconManageWay";
import IconService from "../icon/IconService";

export const slideNav = [
  {
    id: 1,
    group: "Manage Users",
    icon: <IconManageUser />,
    children: [
      {
        id: 1.1,
        name: "Team",
        link: "/team",
      },
      {
        id: 1.2,
        name: "Merchants",
        link: "/merchants",
      },
      {
        id: 1.3,
        name: "Delivery Men",
        link: "/delivery-men",
      },
    ],
  },
  {
    id: 2,
    group: "Manage Ways",
    icon: <IconManageWay />,
    children: [
      {
        id: 2.1,
        name: "Ways",
        link: "/ways",
      },
    ],
  },
  {
    id: 3,
    group: "Manage Services",
    icon: <IconService />,
    children: [
      {
        id: 3.1,
        name: "Zone",
        link: "/zone",
      },
    ],
  },
];
