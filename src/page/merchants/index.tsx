import IconPlus from "@/common/icon/IconPlus";
import IconSearch from "@/common/icon/IconSearch";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import Paginations from "@/components/pagination";
import { useState } from "react";
import UseDebounce from "@/hook/use-debounce";
import { useMerchants } from "@/store/server/merchants/query";
import { columns } from "./components/column";

const Merchant = () => {
  const navigate = useNavigate();

  // react hook
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // custom hook
  const { debounce } = UseDebounce(search);

  const { data } = useMerchants({
    page: page - 1,
    size: 9,
    query: debounce,
  });

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center justify-between">
        <p className=" text-lg font-[500]">Merchant List</p>

        <div className=" flex items-center gap-4">
          <Button
            className="  font-[400] cursor-pointer bg-dms-50 hover:bg-dms-50"
            size={"lg"}
            onClick={() => navigate("/merchants/add-merchant")}
          >
            <IconPlus /> Add Merchant
          </Button>
        </div>
      </div>
      <div className=" p-5 bg-white overflow-hidden h-[85vh] w-full mt-4 ">
        <div className=" flex items-center justify-end">
          <div className=" relative flex items-center">
            <Input
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
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
          <DataTable data={data?.data.content || []} columns={columns} />
        </div>
        <div className=" flex justify-end">
          <Paginations
            page={page}
            total={data?.data?.page.totalPages || 0}
            handlePage={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
