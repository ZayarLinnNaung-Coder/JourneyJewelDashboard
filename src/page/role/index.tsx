import IconLeft from "@/common/icon/IconLeft";
import IconPlus from "@/common/icon/IconPlus";
import { Button } from "@/components/ui/button";
import { useGetRole } from "@/store/server/role/queries";
import { Link, useNavigate } from "react-router";

const Role = () => {
  const navigate = useNavigate();
  const { data } = useGetRole();
  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Link to={"/team"}>
            <IconLeft />
          </Link>
          <p className=" text-lg font-[500]">
            Role Settings{" "}
            <span className=" font-normal pl-2 text-gray-500 text-sm">
              (Manage role & permissions here)
            </span>{" "}
          </p>
        </div>

        <div className=" flex items-center gap-4">
          <Button
            className="  font-[400] cursor-pointer bg-dms-50 hover:bg-dms-50"
            size={"lg"}
            onClick={() => navigate("/role/add-role")}
          >
            <IconPlus /> Create New Role
          </Button>
        </div>
      </div>
      <div className=" p-5 bg-white overflow-hidden overflow-y-scroll h-[85vh] w-full mt-4 ">
        <div className=" grid grid-cols-4 gap-5">
          {data?.data.map((role) => (
            <div key={role.id} className=" border">
              <div className=" text-sm flex items-center justify-between px-5 py-2">
                <p>{role.name}</p>
                <div className=" flex items-center gap-2">
                  <Link
                    className=" text-dms-50"
                    to={`/role/edit-role/${role.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/role/remove-role/${role.id}`}
                    className=" text-dms-50 cursor-pointer"
                  >
                    Remove
                  </Link>
                </div>
              </div>
              <img
                src={
                  role.imageUrl ||
                  "https://www.kore1.com/wp-content/uploads/2014/09/Know-Your-Role-and-Stick-to-it.jpg"
                }
                alt="img"
                className=" w-full h-[170px] object-cover"
              />
              <div className=" space-y-2 p-4">
                <p className=" text-sm text-black/50">
                  Total Member ({role.totalMembers}){" "}
                </p>
                <p>{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Role;
