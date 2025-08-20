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
      }
    ],
  },
  {
    id: 2,
    group: "Manage Places",
    icon: <IconManageWay />,
    children: [
      {
        id: 2.1,
        name: "Places",
        link: "/places",
      },
    ],
  },
  {
    id: 3,
    group: "Manage Transportations",
    icon: <IconService />,
    children: [
      {
        id: 3.1,
        name: "Transportation",
        link: "/transportations",
      },
    ],
  },
  {
    id: 4,
    group: "Manage Business",
    icon: <IconService />,
    children: [
      {
        id: 3.1,
        name: "Hotels",
        link: "/hotels",
      },
      {
        id: 3.2,
        name: "Packages",
        link: "/packages",
      },
    ],
  },
];
