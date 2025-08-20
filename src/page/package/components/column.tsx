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

];
