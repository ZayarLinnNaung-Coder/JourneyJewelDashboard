import IconPlus from "@/common/icon/IconPlus";
import IconSearch from "@/common/icon/IconSearch";
import IconSettings from "@/common/icon/IconSettings";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRole } from "@/store/server/role/queries";
import { useGetTeams } from "@/store/server/team/queries";
import { columns } from "./components/column";
import { useNavigate } from "react-router";
import IconLoder from "@/common/icon/IconLoder";
import Paginations from "@/components/pagination";
import { useState } from "react";
import UseDebounce from "@/hook/use-debounce";

const Team = () => {
  const navigate = useNavigate();

  // react hook
  const [page, setPage] = useState(1);
  const [{ select, search }, setSelect] = useState({
    select: "0",
    search: "",
  });

  // custom hook
  const { debounce } = UseDebounce(search);

  // query & mutation
  const { data, isPending } = useGetRole();

  const { data: team } = useGetTeams({
    page: page - 1,
    size: 9,
    roleId: select == "0" ? "" : select,
    query: debounce,
  });

  const selectRole = data?.data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const allRole = selectRole && [
    ...selectRole,
    ...[{ id: 0, name: "All Role" }],
  ];

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center justify-between">
        <p className=" text-lg font-[500]">Team List</p>

        <div className=" flex items-center gap-4">
          <Button
            className="  font-[400] cursor-pointer bg-dms-50 hover:bg-dms-50"
            size={"lg"}
            onClick={() => navigate("/team/add-team")}
          >
            <IconPlus /> Add Member
          </Button>
        </div>
      </div>
      <div className=" p-5 bg-white overflow-hidden h-[85vh] w-full mt-4 ">
        <div className=" flex items-center justify-between">
          <Select
            value={select}
            onValueChange={(val) =>
              setSelect((prev) => ({ ...prev, select: val }))
            }
            defaultValue=""
          >
            <SelectTrigger className=" w-[150px]">
              <SelectValue placeholder={"Select"} />
            </SelectTrigger>
            <SelectContent>
              {isPending ? (
                <div className=" h-[120px] flex items-center justify-center ">
                  <IconLoder className="animate-spin" />
                </div>
              ) : (
                <>
                  {allRole?.map((rol) => (
                    <SelectItem key={rol.id} value={rol.id.toString()}>
                      {rol.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>

          <div className=" relative flex items-center">
            <Input
              value={search}
              placeholder="Search"
              onChange={(e) =>
                setSelect((pre) => ({ ...pre, search: e.target.value }))
              }
              className=" rounded-none w-[300px]"
            />
            <Button className=" bg-dms-50 rounded-none ">
              <IconSearch />
              Search
            </Button>
          </div>
        </div>

        {/* data table */}
        <div className=" h-[66vh] mt-4">
          <DataTable data={team?.content || []} columns={columns} />
        </div>
        <div className=" flex justify-end">
          <Paginations
            page={page}
            total={team?.page.totalPages || 0}
            handlePage={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
