import IconManageUser from "../icon/IconManageUser";
import IconManageWay from "../icon/IconManageWay";
import IconService from "../icon/IconService";

export const slideNav = [
  {
    id: 1,
    group: "Manage Users",
    icon: <IconManageUser />,
    permission: ['SUPER_ADMIN'],
    children: [
      {
        id: 1.1,
        name: "Team",
        link: "/team",
        permission: ['SUPER_ADMIN']
      },
      {
        id: 1.2,
        name: "Merchants",
        link: "/merchants",
        permission: ['SUPER_ADMIN']
      }
    ],
  },
  {
    id: 2,
    group: "Manage Places",
    icon: <IconManageWay />,
    permission: ['SUPER_ADMIN',"OPERATION_MANAGER"],
    children: [
      {
        id: 2.1,
        name: "Places",
        link: "/places",
        permission: ['SUPER_ADMIN',"OPERATION_MANAGER"]
      },
    ]
  },
  {
    id: 3,
    group: "Manage Transportations",
    icon: <IconService />,
    permission: ['SUPER_ADMIN', "TRANSPORTATION_MANAGER"],
    children: [
      {
        id: 3.1,
        name: "Transportation",
        link: "/transportations",
        permission: ['SUPER_ADMIN', "TRANSPORTATION_MANAGER"],
      },
    ],
  },
  {
    id: 4,
    group: "Manage Business",
    icon: <IconService />,
    permission: ['SUPER_ADMIN', "HOTEL_MANAGER", "TOUR_MANAGER"],
    children: [
      {
        id: 3.1,
        name: "Hotels",
        link: "/hotels",
        permission: ['SUPER_ADMIN', "HOTEL_MANAGER"]
      },
      {
        id: 3.2,
        name: "Packages",
        link: "/packages",
        permission: ['SUPER_ADMIN', "TOUR_MANAGER"]
      },
    ],
  },
];
