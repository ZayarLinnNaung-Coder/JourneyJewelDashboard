import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/store/client/useStore";
import { fetchProfile } from "@/common/util/axiox";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSideBar from "./components/app-sidebar";
import { Separator } from "@/components/ui/separator";

const AppLayout = () => {
  const [authorized, setAuthorized] = useState(true);
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (token) {
      const fetchingData = async () => {
        try {
          const data = await fetchProfile(token);
          setAuthorized(data.message === "Success");
        } catch (error) {
          console.log(error);
          setAuthorized(false);
        }
      };

      fetchingData();
    } else {
      setAuthorized(false);
    }
  }, [token]);

  if (!authorized) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <SidebarProvider className="">
      <AppSideBar />
      <SidebarInset className=" bg-gray-100 w-full">
        <header className="flex bg-white h-12 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/*  */}
          </div>
        </header>
        <div className=" ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
