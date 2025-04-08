import IconLeft from "@/common/icon/IconLeft";
import { DateRangePicker } from "@/components/date-range-picker";
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
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";
import dayjs from "dayjs";
import { useEditMerchant } from "@/store/server/merchants/mutation";
import { useMerchantById } from "@/store/server/merchants/query";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  mail: z.string().min(1, { message: "Email required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number required" }),
  address: z.string().min(1, { message: "Address required" }),
  contractStartDate: z.date(),
  contractEndDate: z.date(),
});

const EditMerchant = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      mail: "",
      phoneNumber: "",
      address: "",
      contractStartDate: new Date(),
      contractEndDate: new Date(),
    },
    resolver: zodResolver(formSchema),
  });

  const { id } = useParams();

  const editMerchant = useEditMerchant(id?.toString() || "");
  const { data } = useMerchantById(id?.toString() || "");

  useEffect(() => {
    if (data?.data) {
      form.setValue("name", data.data.name);
      form.setValue("phoneNumber", data.data.phoneNumber);
      form.setValue("mail", data.data.email);
      form.setValue("address", data.data.address);
      form.setValue("contractStartDate", new Date(data.data.contractStartDate));
      form.setValue("contractEndDate", new Date(data.data.contractEndDate));
      setDate({
        from: new Date(data.data.contractStartDate),
        to: new Date(data.data.contractEndDate),
      });
    }
  }, [data?.data]);

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDate(newDateRange);

    if (newDateRange?.from && newDateRange.to) {
      form.setValue("contractStartDate", newDateRange.from);
      form.setValue("contractEndDate", newDateRange.to);
    }
  };

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/merchants"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Edit Merchant
          <span className=" text-sm pl-2 text-black/50 font-normal"></span>
        </p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) => {
              editMerchant.mutate({
                ...val,
                contractStartDate: dayjs(val.contractStartDate).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
                contractEndDate: dayjs(val.contractEndDate).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
                email: val.mail,
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
                    <span className=" text-red-500">*</span>Merchant Name
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
                        placeholder="example@gmail.com"
                      />
                    </div>
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
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contractStartDate"
              render={() => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Contract Period
                  </FormLabel>
                  <FormControl>
                    <DateRangePicker date={date} setDate={handleDateChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-2">
              <Link
                to={"/merchants"}
                className="  text-sm w-full rounded-lg h-9 flex items-center justify-center bg-transparent border "
              >
                Cancel
              </Link>
              <Button
                disabled={editMerchant.isPending}
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

export default EditMerchant;
