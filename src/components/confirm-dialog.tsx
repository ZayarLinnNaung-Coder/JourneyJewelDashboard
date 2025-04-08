import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import IconTag from "@/common/icon/IconTag";
import { Button } from "./ui/button";

interface dialogProps {
  children: ReactNode;
  type?: "delete" | "confirm";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onComfirm: () => void;
  isPending?: boolean;
}

const ConfirmDialog = ({
  children,
  type = "confirm",
  open,
  setOpen,
  isPending = false,
  onComfirm,
}: dialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="">
        <DialogTitle className=" flex items-center gap-2 font-normal text-base">
          <IconTag /> {children}
        </DialogTitle>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant={"outline"}
            className=" cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onComfirm}
            variant={"outline"}
            disabled={isPending}
            className={`${
              type === "confirm" ? "bg-dms-50" : "bg-red-500 hover:bg-red-600 "
            } text-white cursor-pointer hover:text-white`}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
