import ConfirmDialog from "@/components/confirm-dialog";
import { useDeleteTeam } from "@/store/server/team/mutation";
import { teamContent } from "@/store/server/team/typed";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router";

export const columns: ColumnDef<teamContent>[] = [
  {
    accessorKey: "username",
    header: () => <p className=" w-[150px] ">Name</p>,
  },
  {
    accessorKey: "email",
    header: () => <p className=" w-[220px] ">Email</p>,
  },
  {
    accessorKey: "roleName",
    header: () => <p className=" w-[150px] ">Role</p>,
  },
  {
    accessorKey: "lastDispatchTime",
    header: () => <p className=" w-[220px] ">Last Dispatch Time</p>,
  },
  {
    accessorKey: "id",
    header: () => <p className=" w-[20px] ">Action</p>,
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
        <div className=" !w-[100px]  justify-end flex items-center gap-1">
          <span
            onClick={() => setOpen(true)}
            className=" cursor-pointer pr-3 text-dms-50"
          >
            Remove
          </span>
          <div className="  h-2 border-r border-dms-50 "></div>
          <Link className=" pl-3 text-dms-50" to={`/team/edit-team/${id}`}>
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
