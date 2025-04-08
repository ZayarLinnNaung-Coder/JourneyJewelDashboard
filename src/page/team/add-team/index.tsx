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
import { useAddTeam } from "@/store/server/team/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  role: z.string().min(1, { message: "Role required" }),
  mail: z.string().min(1, { message: "Email required" }),
});

const AddTeam = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      role: "",
      mail: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { data, isPending } = useGetRole();
  const addTeam = useAddTeam();

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/team"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Add Member{" "}
          <span className=" text-sm text-black/50 font-normal">
            (Place to add new member to the team)
          </span>
        </p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) =>
              addTeam.mutate({
                roleId: val.role,
                email: val.mail,
              })
            )}
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
                disabled={addTeam.isPending}
                type="submit"
                className=" hover:bg-dms-50 w-1/2 bg-dms-50 "
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTeam;
