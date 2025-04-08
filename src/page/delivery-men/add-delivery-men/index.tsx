import IconLeft from "@/common/icon/IconLeft";
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

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateDeli } from "@/store/server/delivery-man/mutation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z.string().min(1, { message: "Email required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number required" }),
  address: z.string().min(1, { message: "Address required" }),
  vehicleType: z.enum(["BICYCLE", "VAN", "BIKE"]),
  zoneId: z.string(),
});

const AddDeliveryMen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      vehicleType: "BICYCLE",
    },
    resolver: zodResolver(formSchema),
  });

  const addDeli = useCreateDeli();

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/delivery-men"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Add Delivery Man
          <span className=" text-sm pl-2 text-black/50 font-normal">
            (Place to add new delivery men)
          </span>
        </p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) => {
              addDeli.mutate({
                name: val.name,
                email: val.email,
                phoneNumber: val.phoneNumber,
                address: val.address,
                vehicleType: val.vehicleType,
                zoneId: val.zoneId,
              });
            })}
            action=""
            className=" space-y-6 w-[400px] "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Delivery Man Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className=" w-full" placeholder="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className=" flex items-center">
                      <div className=" bg-[#FAFAFA] border  rounded-l-lg h-9 px-3 flex items-center justify-center text-sm">
                        09
                      </div>
                      <Input
                        {...field}
                        className=" rounded-l-none border-l-0 w-full"
                        placeholder="09XXXXX"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className=" w-full"
                      placeholder="Text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zoneId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span> Zone
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select Zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {isPending ? (
                        <div className=" h-[150px] flex items-center justify-center ">
                          <IconLoder className="animate-spin" />
                        </div>
                      ) : (
                        <>
                          {data?.data.map((rol) => ( */}
                      <SelectItem value={"A"}>Zone A</SelectItem>
                      {/* ))}
                        </>
                      )} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-y-1"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BICYCLE" />
                        </FormControl>
                        <FormLabel className="font-normal">Bicycle</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="VAN" />
                        </FormControl>
                        <FormLabel className="font-normal">Van</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BIKE" />
                        </FormControl>
                        <FormLabel className="font-normal">Bike</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex items-center gap-2">
              <Link
                to={"/delivery-men"}
                className="  text-sm w-full rounded-lg h-9 flex items-center justify-center bg-transparent border "
              >
                Cancel
              </Link>
              <Button
                disabled={addDeli.isPending}
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

export default AddDeliveryMen;
