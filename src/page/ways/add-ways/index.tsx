import IconLeft from "@/common/icon/IconLeft";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { formSchemaSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCity } from "@/store/server/city/queries";
import IconLoder from "@/common/icon/IconLoder";
import { Button } from "@/components/ui/button";
import { useCreateWay } from "@/store/server/ways/mutation";

const AddWay = () => {
  const form = useForm<z.infer<typeof formSchemaSchema>>({
    resolver: zodResolver(formSchemaSchema),
    defaultValues: {
      orderDetails: {
        deliveryZone: {
          from: {
            id: "",
          },
          to: {
            id: "",
          },
        },
      },
      senderInfo: {
        senderName: "",
        phoneNumber: "",
        address: "",
        packageDetails: {
          packageCategoryType: "",
          packageSize: "",
          packageWeight: "",
        },
      },
      receiverInfo: {
        receiverName: "",
        phoneNumber: "",
        address: "",
      },
    },
  });

  const { data, isPending } = useCity();

  const way = useCreateWay();

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/zone"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Create Order
          <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to create order manually)
          </span>
        </p>
      </div>
      <div className=" mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) =>
              way.mutate({
                orderDetails: {
                  deliveryZone: {
                    from: {
                      id: val.orderDetails.deliveryZone.from.id,
                    },
                    to: {
                      id: val.orderDetails.deliveryZone.to.id,
                    },
                  },
                  deliveryFee: Number(val.orderDetails.deliveryFee),
                  codAmount: Number(val.orderDetails.codAmount),
                },
                senderInfo: {
                  senderName: val.senderInfo.senderName,
                  phoneNumber: val.senderInfo.phoneNumber,
                  address: val.senderInfo.address,
                  packageDetails: [
                    {
                      packageCategoryType:
                        val.senderInfo.packageDetails.packageCategoryType,
                      packageSize: val.senderInfo.packageDetails.packageSize,
                      packageWeight:
                        val.senderInfo.packageDetails.packageWeight,
                    },
                  ],
                },
                receiverInfo: val.receiverInfo,
              })
            )}
            className=" space-y-8"
          >
            <div className=" bg-white">
              <div className=" border-b px-5 py-4 font-[500]">
                <p>Sender Information</p>
              </div>
              <div className=" px-5 py-8 grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="senderInfo.senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-[400] gap-1 items-center flex">
                        <span className="text-red-500">*</span>Sender Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="enter sender name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderInfo.phoneNumber"
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
                            placeholder="enter your phone number"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-[400] gap-1 items-center flex">
                        <span className="text-red-500">*</span>Address
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="enter sender address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="  bg-white">
              <div className=" border-b px-5 py-4 font-[500]">
                <p>Receiver Information</p>
              </div>
              <div className=" px-5 py-8 grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="receiverInfo.receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-[400] gap-1 items-center flex">
                        <span className="text-red-500">*</span>Receiver Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="enter receiver name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiverInfo.phoneNumber"
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
                            placeholder="enter your phone number"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiverInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-[400] gap-1 items-center flex">
                        <span className="text-red-500">*</span>Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="enter receiver address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className=" bg-white">
              <div className=" border-b px-5 py-4 font-[500]">
                <p>Order Details</p>
              </div>
              <div className=" px-5 items-center py-8 grid grid-cols-3 gap-4">
                <div className="">
                  <label
                    className=" text-sm flex items-center gap-1"
                    htmlFor=""
                  >
                    <span className=" text-red-500">*</span>Delivery Zone
                  </label>
                  <div className=" mt-2 grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="orderDetails.deliveryZone.from.id"
                      render={() => (
                        <FormItem>
                          <Select>
                            <FormControl>
                              <SelectTrigger className=" w-full">
                                <SelectValue placeholder="From" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isPending ? (
                                <div className=" h-[200px] flex items-center justify-center ">
                                  <IconLoder className=" animate-spin" />
                                </div>
                              ) : (
                                <>
                                  {data?.data.content.map((city) => (
                                    <SelectItem key={city.id} value={city.id}>
                                      {city.name}
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderDetails.deliveryZone.to.id"
                      render={() => (
                        <FormItem>
                          <Select>
                            <FormControl>
                              <SelectTrigger className=" w-full">
                                <SelectValue placeholder="To" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isPending ? (
                                <div className=" h-[200px] flex items-center justify-center ">
                                  <IconLoder className=" animate-spin" />
                                </div>
                              ) : (
                                <>
                                  {data?.data.content.map((city) => (
                                    <SelectItem key={city.id} value={city.id}>
                                      {city.name}
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="orderDetails.deliveryFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-[400] gap-1 items-center flex">
                          <span className="text-red-500">*</span>Delivery Fee
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="orderDetails.codAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-[400] gap-1 items-center flex">
                          <span className="text-red-500">*</span>COD Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="enter cod amount if have"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className=" bg-white">
              <div className=" border-b px-5 py-4 font-[500]">
                <p>Package Details</p>
              </div>
              <div className=" px-5 items-center py-8 grid grid-cols-3 gap-4">
                <div className="">
                  <FormField
                    control={form.control}
                    name="senderInfo.packageDetails.packageCategoryType"
                    render={() => (
                      <FormItem>
                        <FormLabel className=" font-[400] gap-1 items-center flex">
                          <span className="text-red-500">*</span>Package
                          Category
                        </FormLabel>
                        <Select>
                          <FormControl>
                            <SelectTrigger className=" w-full">
                              <SelectValue placeholder="Choose Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vehincle">Vehincle</SelectItem>
                            <SelectItem value="bicycle">Bicycle</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="senderInfo.packageDetails.packageCategoryType"
                    render={() => (
                      <FormItem>
                        <FormLabel className=" font-[400] gap-1 items-center flex">
                          <span className="text-red-500">*</span>Package Size
                        </FormLabel>
                        <Select>
                          <FormControl>
                            <SelectTrigger className=" w-full">
                              <SelectValue placeholder="Choose Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="S">Small</SelectItem>
                            <SelectItem value="M">Medium</SelectItem>
                            <SelectItem value="L">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="senderInfo.packageDetails.packageWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-[400] gap-1 items-center flex">
                        <span className="text-red-500">*</span>Package Weight
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="choose package weight" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className=" flex items-center justify-end gap-4 pb-10">
              <Button
                type="button"
                variant="outline"
                className=" h-10 w-[180px]"
              >
                Cancel
              </Button>
              <Button
                disabled={way.isPending}
                type="submit"
                className=" hover:bg-dms-50 bg-dms-50 h-10 w-[180px]  "
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

export default AddWay;
