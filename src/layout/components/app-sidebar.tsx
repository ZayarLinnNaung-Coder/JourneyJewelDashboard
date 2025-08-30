import { slideNav } from "@/common/dummy";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import logo from "@/assets/logo.png";

const AppSideBar = () => {
  const { pathname: pathData } = useLocation();

  const pathParam = "/" + pathData.split("/")[1];
  const pathname = pathParam == "/role" ? "/team" : pathParam;

  const hasPermission = (requiredPermissions: string[] | undefined) => {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    const userPermission = localStorage.getItem('role') as string;
    return requiredPermissions.includes(userPermission);
  };

  // Filter slideNav to only include groups and children the user has permission for
  const filteredSlideNav = slideNav
      .filter(nv => hasPermission(nv.permission)) // Filter main groups
      .map(nv => ({
        ...nv,
        children: nv.children.filter(sub => hasPermission(sub.permission)) // Filter children
      }))
      .filter(nv => nv.children.length > 0); // Remove groups with no visible children

  // Calculate mainAcc based on filtered navigation
  const mainAcc = filteredSlideNav.map((da) =>
      da.children.some((item) => item.link == pathname)
  );

  return (
      <Sidebar className="">
        <SidebarHeader className=" pl-4 text-dms-50 flex items-center gap-2 flex-row font-[500] text-lg">
          <img src={logo} className=" w-[40px]  " alt="" />
          Journey Jewel
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {filteredSlideNav.map((nv, idx) => (
                  <Collapsible
                      defaultOpen={mainAcc[idx]}
                      asChild
                      className="group/collapsible"
                      key={nv.id}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger className=" hover:text-dms-50" asChild>
                        <SidebarMenuButton
                            className={`${
                                mainAcc[idx] ? " cursor-pointer  text-dms-50" : ""
                            } hover:text-dms-50  `}
                            tooltip={nv.group}
                        >
                          {nv.icon}
                          <span>{nv.group}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {nv.children.map((sub) => (
                              <SidebarMenuSubItem key={sub.name}>
                                <SidebarMenuSubButton
                                    className={`${
                                        pathname == sub.link && " bg-dms-25 text-dms-50"
                                    } focus:text-dms-50 hover:text-dms-50 hover:bg-dms-25 focus:bg-dms-25`}
                                    asChild
                                >
                                  <Link to={sub.link}>
                                    <span>{sub.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
  );
};

export default AppSideBar;