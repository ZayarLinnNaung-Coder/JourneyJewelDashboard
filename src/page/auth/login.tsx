import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IconUser from "@/common/icon/IconUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import IconLock from "@/common/icon/IconLock";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router";
import logo from "@/assets/logo.png";
import { useLogin } from "@/store/server/auth/auth";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1, { message: "Password Required" }),
});
const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const login = useLogin();
  return (
    <div className=" bg-gray-50 h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((val) =>
            login.mutate(val, {
              onSuccess: () => toast.success("Login successfully"),
            })
          )}
          className=" bg-white shadow space-y-5 border rounded-xl p-5 w-[400px]"
          action=""
        >
          <div className="">
            <div className=" flex items-center justify-center gap-3">
              <img src={logo} alt="logo" className=" w-[45px] h-[45px]" />
              <h2 className=" text-dms-50 text-2xl">Journey Jewel</h2>
            </div>
            <p className=" mt-3 text-black/50 text-sm text-center ">
              A Place Where You Can Manage All Ways
            </p>
          </div>
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" relative">
                    <Input
                      {...field}
                      placeholder="Username"
                      className=" pl-7 border-[#D9D9D9]"
                    />
                    <span className=" absolute left-2 top-1/2 -translate-y-1/2 ">
                      <IconUser />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" relative">
                    <Input
                      {...field}
                      placeholder="Password"
                      className=" pl-7 border-[#D9D9D9]"
                    />
                    <span className=" absolute left-2 top-1/2 -translate-y-1/2 ">
                      <IconLock />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" -mt-2 flex items-center justify-between">
            <div className=" flex gap-2 items-center">
              <Checkbox className="" />
              <span className=" text-sm font-normal">Remember me</span>
            </div>
            <Link to={"#"} className=" text-sm text-dms-50">
              Forgot your password?
            </Link>
          </div>
          <Button className=" hover:bg-dms-50 cursor-pointer bg-dms-50 w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
