import ConfirmDialog from "@/components/confirm-dialog";
import { useRemoveDeli } from "@/store/server/delivery-man/mutation";
import { Content } from "@/store/server/ways/typed";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router";

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "id",
    header: () => <p className=" w-[200px] ">Order ID</p>,
  },
  {
    accessorKey: "senderName",
    header: () => <p className=" w-[140px] ">Sender Name</p>,
    cell: ({ row }) => {
      console.log(row);

      return <p className=" w-[140px] ">{row.getValue("senderName") || "-"}</p>;
    },
  },
  {
    accessorKey: "orderCreatedDate",
    header: () => <p className="  w-[140px] ">Order Created Date</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px]">
          {dayjs(row.getValue("orderCreatedDate")).format("YYYY-MM-DD")}
        </p>
      );
    },
  },
  {
    accessorKey: "deliveryName",
    header: () => <p className="  w-[140px] ">Delivery Men Name</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] ">{row.getValue("deliveryName") || "-"}</p>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => <p className="  w-[140px] ">Delivery Status</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] ">{row.getValue("orderStatus") || "-"}</p>
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
