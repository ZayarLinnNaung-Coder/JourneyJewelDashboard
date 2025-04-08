import IconPlus from "@/common/icon/IconPlus";
import IconSearch from "@/common/icon/IconSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllZone } from "@/store/server/zone/queries";
import { Link, useNavigate } from "react-router";

const Role = () => {
  const navigate = useNavigate();
  const { data } = useGetAllZone();

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <p className=" text-lg font-[500]">Zone List</p>
        </div>

        <div className=" flex items-center gap-4">
          <Button
            className="  font-[400] cursor-pointer bg-dms-50 hover:bg-dms-50"
            size={"lg"}
            onClick={() => navigate("/zone/create")}
          >
            <IconPlus /> Create Zone
          </Button>
        </div>
      </div>
      <div className=" p-5 bg-white overflow-hidden overflow-y-scroll h-[85vh] w-full mt-4 ">
        <div className=" flex items-center justify-end">
          <div className=" relative flex items-center">
            <Input placeholder="Search" className=" rounded-none w-[300px]" />
            <Button className=" bg-dms-50 rounded-none ">
              <IconSearch />
              Search
            </Button>
          </div>
        </div>
        <div className=" mt-5 grid grid-cols-4 gap-5">
          {data?.data.content?.map((zone) => (
            <div key={zone.id} className=" border">
              <div className=" border-b py-3 px-3 text-sm flex justify-between">
                <div>{zone.name}</div>
                <div className=" flex items-center gap-2">
                  <Link className=" text-dms-50" to={`/zone/update/${zone.id}`}>
                    Edit
                  </Link>
                  <Link to={`#`} className=" text-dms-50 cursor-pointer">
                    Remove
                  </Link>
                </div>
              </div>
              <div className=" space-y-3 text-sm px-3 py-5">
                <p>{zone.zoneId}</p>
                <p className=" text-black/50">
                  ({zone.cities.length}) cities, (1) countries
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Role;
