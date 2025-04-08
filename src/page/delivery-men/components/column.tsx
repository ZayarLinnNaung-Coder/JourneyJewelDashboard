import ConfirmDialog from "@/components/confirm-dialog";
import { useRemoveDeli } from "@/store/server/delivery-man/mutation";
import { Content } from "@/store/server/delivery-man/typed";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router";

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "name",
    header: () => <p className=" w-[140px] ">Name</p>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <p className=" w-[140px] ">Phone Number</p>,
  },
  {
    accessorKey: "accountStatus",
    header: () => <p className=" text-center w-[140px] ">Status</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] text-center">
          {row.getValue("accountStatus") || "-"}
        </p>
      );
    },
  },

  {
    accessorKey: "zoneId",
    header: () => <p className=" text-center w-[140px] ">Zone</p>,
    cell: ({ row }) => {
      return <p className=" w-[140px] text-center">{row.getValue("zoneId")}</p>;
    },
  },
  {
    accessorKey: "totalRoutes",
    header: () => <p className=" text-center w-[140px] ">Total Route Count</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] text-center">{row.getValue("totalRoutes")}</p>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <p className=" w-[100px] ">Action</p>,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const remove = useRemoveDeli();
      const id = row.getValue("id") as string;

      const handleDeleteDelivery = () => {
        remove.mutate(id, {
          onSuccess: () => setOpen(false),
        });
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
            onComfirm={handleDeleteDelivery}
            type="delete"
            open={open}
            setOpen={setOpen}
            isPending={remove.isPending}
          >
            Are you sure to remove this delivery man?
          </ConfirmDialog>{" "}
        </div>
      );
    },
  },
];
