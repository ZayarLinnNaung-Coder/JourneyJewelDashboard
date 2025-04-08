import IconLeft from "@/common/icon/IconLeft";
import IconLoder from "@/common/icon/IconLoder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRole } from "@/store/server/role/queries";
import { useEditTeam } from "@/store/server/team/mutation";
import { useGetTeamById } from "@/store/server/team/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  role: z.string().min(1, { message: "Role required" }),
  mail: z.string().min(1, { message: "Email required" }),
});

const EditTeam = () => {
  const param = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      role: "",
      mail: "",
    },
    resolver: zodResolver(formSchema),
  });

  // query
  const { data: teamById } = useGetTeamById(param?.id?.toString() || "");
  const { data, isPending } = useGetRole();

  // mutation
  const editTeam = useEditTeam(param?.id?.toString() || "");

  useEffect(() => {
    if (teamById) {
      form.setValue("mail", teamById.email);
      form.setValue("role", teamById?.role?.id);
    }
  }, [teamById]);

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/team"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">Edit Member</p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) => editTeam.mutate(val.role))}
            action=""
            className=" space-y-6 w-[400px] "
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span> Role
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Role Permission" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isPending ? (
                        <div className=" h-[150px] flex items-center justify-center ">
                          <IconLoder className="animate-spin" />
                        </div>
                      ) : (
                        <>
                          {data?.data.map((rol) => (
                            <SelectItem key={rol.id} value={rol.id.toString()}>
                              {rol.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      className=" w-full"
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-2">
              <Link
                to={"/team"}
                className="  text-sm w-full rounded-lg h-9 flex items-center justify-center bg-transparent border "
              >
                Cancel
              </Link>
              <Button
                disabled={editTeam.isPending}
                type="submit"
                className=" hover:bg-dms-50 w-1/2 bg-dms-50 "
              >
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditTeam;
