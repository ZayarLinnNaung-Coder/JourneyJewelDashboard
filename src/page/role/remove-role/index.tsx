import IconLeft from "@/common/icon/IconLeft";
import IconLoder from "@/common/icon/IconLoder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRemoveRole } from "@/store/server/role/mutation";
import { useGetRole, useGetRoleById } from "@/store/server/role/queries";
import { useState } from "react";
import { Link, useParams } from "react-router";

const RemoveRole = () => {
  const { id } = useParams();
  const { data } = useGetRoleById(id?.toString() || "");
  const { data: role, isPending } = useGetRole();
  const [roleId, setRoleId] = useState("");

  const remove = useRemoveRole(id?.toString() || "");
  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/role"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Remove Role{" "}
          <span className=" text-sm text-black/50 font-normal">
            (remove the exiting role)
          </span>
        </p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <div className=" w-[400px]">
          <label className=" flex items-center text-sm gap-2" htmlFor="mail">
            <span className=" text-red-500">*</span>
            Mail
          </label>
          <div className=" ">
            {data?.data && data.data.admins.length < 1 ? (
              <>
                <Input disabled />
              </>
            ) : (
              <>
                {data?.data.admins.map((adm) => (
                  <div key={adm.adminId}>
                    <Input disabled value={adm.email} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className=" mt-5">
            <label
              className=" mb-2 flex items-center text-sm gap-2"
              htmlFor="mail"
            >
              <span className=" text-red-500">*</span>
              Role
            </label>
            <Select
              value={roleId}
              onValueChange={(val) => setRoleId(val)}
              defaultValue=""
            >
              <SelectTrigger className=" w-full">
                <SelectValue placeholder={"Select"} />
              </SelectTrigger>
              <SelectContent>
                {isPending ? (
                  <div className=" h-[120px] flex items-center justify-center ">
                    <IconLoder className="animate-spin" />
                  </div>
                ) : (
                  <>
                    {role?.data?.map((rol) => (
                      <SelectItem key={rol.id} value={rol.id.toString()}>
                        {rol.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className=" mt-5 flex items-center gap-2">
            <Link
              to={"/role"}
              className="  text-sm w-full rounded-lg h-9 flex items-center justify-center bg-transparent border "
            >
              Cancel
            </Link>
            <Button
              onClick={() => remove.mutate(roleId)}
              disabled={roleId.length == 0 || remove.isPending}
              type="submit"
              className=" hover:bg-dms-50 w-1/2 bg-dms-50 "
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveRole;
