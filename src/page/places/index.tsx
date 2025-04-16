import IconPlus from "@/common/icon/IconPlus";
import IconSearch from "@/common/icon/IconSearch";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columns } from "./components/column";
import { useNavigate } from "react-router";
import Paginations from "@/components/pagination";
import { useState } from "react";
import UseDebounce from "@/hook/use-debounce";
import {useGetPlaces } from "@/store/server/places/query.tsx";

const Places = () => {
  const navigate = useNavigate();

  // react hook
  const [page, setPage] = useState(1);
  const [{ select, search }, setSelect] = useState({
    select: "0",
    search: "",
  });

  // custom hook
  const { debounce } = UseDebounce(search);

  const { data: place } = useGetPlaces({
    page: page - 1,
    size: 9,
    query: debounce,
  });

  return (
      <div className=" px-5 pt-5">
        <div className=" flex items-center justify-between">
          <p className=" text-lg font-[500]">Place List</p>

          <div className=" flex items-center gap-4">
            <Button
                className="  font-[400] cursor-pointer bg-dms-50 hover:bg-dms-50"
                size={"lg"}
                onClick={() => navigate("/places/add")}
            >
              <IconPlus /> Add Place
            </Button>
          </div>
        </div>
        <div className=" p-5 bg-white overflow-hidden h-[85vh] w-full mt-4 ">
          <div className=" flex items-center justify-between">

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
            <DataTable data={place?.content || []} columns={columns} />
          </div>
          <div className=" flex justify-end">
            <Paginations
                page={page}
                total={place?.page.totalPages || 0}
                handlePage={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>
  );
};

export default Places;
