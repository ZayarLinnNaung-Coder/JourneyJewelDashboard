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
          {String(row.getValue("description")).length > 20
              ? String(row.getValue("description")).substring(0, 20) + "..."
              : row.getValue("description")}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <p className="  w-[140px] ">Price</p>,
    cell: ({ row }) => {
      return (
          <p className=" w-[140px]">
            { row.getValue("price") }
          </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <p className=" w-[20px] flex justify-start">Action</p>,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return (
          <div className=" !w-[100px]  justify-start flex items-center gap-1">
            <Link className=" pl-3 text-dms-50" to={`/packages/edit/${id}`}>
              Edit
            </Link>
            {" "}
          </div>
      );
    },
  },

];
