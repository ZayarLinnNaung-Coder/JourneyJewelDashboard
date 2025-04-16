import ConfirmDialog from "@/components/confirm-dialog";
import { useRemoveDeli } from "@/store/server/delivery-man/mutation";
import { Content } from "@/store/server/places/typed";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router";

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "id",
    header: () => <p className=" w-[200px] ">ID</p>,
  },
  {
    accessorKey: "name",
    header: () => <p className=" w-[140px] ">Name</p>,
    cell: ({ row }) => {
      console.log(row);

      return <p className=" w-[140px] ">{row.getValue("name") || "-"}</p>;
    },
  },
  {
    accessorKey: "description",
    header: () => <p className="  w-[140px] ">Description</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px]">
          { row.getValue("description") }
        </p>
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
        <div className=" !w-[100px]  justify-start flex items-center gap-1">
          <Link
            className=" pl-3 text-dms-50"
            to={`/hotels/edit/${id}`}
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
