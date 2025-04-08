import ConfirmDialog from "@/components/confirm-dialog";
import { useRemoveMerchant } from "@/store/server/merchants/mutation";
import { Content } from "@/store/server/merchants/typed";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router";

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "name",
    header: () => <p className=" w-[150px] ">Name</p>,
  },
  {
    accessorKey: "email",
    header: () => <p className=" w-[220px] ">Email</p>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <p className=" w-[150px] ">Phone Number</p>,
  },
  {
    accessorKey: "contractEndDate",
    header: () => <p className=" w-[220px] ">Contract End Date</p>,
  },
  {
    accessorKey: "id",
    header: () => <p className=" w-[20px] ">Action</p>,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const remove = useRemoveMerchant();
      const id = row.getValue("id") as string;

      const handleDeleteTeam = () => {
        remove.mutate(id);
      };

      return (
        <div className=" !w-[100px]  justify-end flex items-center gap-1">
          <span
            onClick={() => setOpen(true)}
            className=" cursor-pointer pr-3 text-dms-50"
          >
            Remove
          </span>
          <div className="  h-2 border-r border-dms-50 "></div>
          <Link
            className=" pl-3 text-dms-50"
            to={`/merchants/edit-merchant/${id}`}
          >
            Edit
          </Link>
          <ConfirmDialog
            onComfirm={handleDeleteTeam}
            type="delete"
            open={open}
            setOpen={setOpen}
            isPending={remove.isPending}
          >
            Are you sure to remove this merchant?
          </ConfirmDialog>{" "}
        </div>
      );
    },
  },
];
