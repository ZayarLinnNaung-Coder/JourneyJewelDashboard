import ConfirmDialog from "@/components/confirm-dialog";
import { useRemoveDeli } from "@/store/server/delivery-man/mutation";
import { Content } from "@/store/server/places/typed";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router";
import {useDeleteTeam} from "@/store/server/team/mutation.tsx";

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "id",
    header: () => <p className=" w-[200px] ">ID</p>,
  },
  {
    accessorKey: "name",
    header: () => <p className=" w-[140px] ">Name</p>,
    cell: ({ row }) => {
      return <p className=" w-[140px] ">{row.getValue("name") || "-"}</p>;
    },
  },
  {
    accessorKey: "description",
    header: () => <p className=" w-[140px] ">Description</p>,
    cell: ({ row }) => {
      return <p className=" w-[140px] ">{row.getValue("description") || "-"}</p>;
    },
  },
  {
    accessorKey: "place",
    header: () => <p className="  w-[140px] ">Place</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] ">{row.getValue("place") || "-"}</p>
      );
    },
  },
  {
    accessorKey: "minBudget",
    header: () => <p className="  w-[140px] ">Min Budget</p>,
    cell: ({ row }) => {
      return (
        <p className=" w-[140px] ">{row.getValue("minBudget") || "-"}</p>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <p className=" w-[20px] flex justify-start">Action</p>,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const remove = useDeleteTeam();
      const id = row.getValue("id") as string;

      const handleDeleteTeam = () => {
        remove.mutate(id, {
          onSuccess: () => setOpen(false),
        });
      };

      return (
          <div className=" !w-[100px]  justify-start flex items-center gap-1">
            <Link className=" pl-3 text-dms-50" to={`/places/edit/${id}`}>
              Edit
            </Link>
            <ConfirmDialog
                onComfirm={handleDeleteTeam}
                type="delete"
                open={open}
                setOpen={setOpen}
                isPending={remove.isPending}
            >
              Are you sure to add this member?
            </ConfirmDialog>{" "}
          </div>
      );
    },
  },
];
