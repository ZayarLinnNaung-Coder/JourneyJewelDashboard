import IconLeft from "@/common/icon/IconLeft";
import IconPlus from "@/common/icon/IconPlus";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import React, {useEffect} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {Link, useParams} from "react-router";
import {z} from "zod";
import {useGetPlaces} from "@/store/server/places/query.tsx";
import {useUpdateTransportation} from "@/store/server/transportations/mutation.tsx";
import {useGetTransportationById} from "@/store/server/transportations/query.tsx";

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    phoneNumber: z.string(),
    timeList: z.string(),
    priceList: z.array(
        z.object({
            placeId: z.string(),
            price: z.any()
        })
    ),
});

const EditTransportation = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            phoneNumber: "",
            timeList: "",
            priceList: [],
        },
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "priceList",
    });

    const { data: place } = useGetPlaces({
        page: 0,
        size: 99999999
    });

    const param = useParams();

    const { data: transportationById } = useGetTransportationById(param?.id?.toString() || "");

    useEffect(() => {
        if (transportationById) {
            console.log(transportationById?.priceList)
            form.setValue("name", transportationById.name);
            form.setValue("description", transportationById?.description);
            form.setValue("priceList", transportationById?.priceList);
            form.setValue("timeList", transportationById?.timeList);
            form.setValue("phoneNumber", transportationById?.phoneNumber);
        }
    }, [transportationById]);

    const updateTransportation = useUpdateTransportation(param?.id?.toString() || '');

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/transportations"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">
                    Edit Transportation
                    <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to edit transportation)
          </span>
                </p>
            </div>
            <div className=" mt-5 p-5 bg-white">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((val) => updateTransportation.mutate(val))}
                        id="form-data"
                        name="form-data"
                        className=" space-y-5"
                        action=""
                    >
                        <div className="gap-4 grid grid-cols-2 items-end">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Name</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter name" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Description</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter description" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Phone Number</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter phone number" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timeList"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Time List</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter time" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid md:grid-cols-2">
                            <div className="card p-5 bg-[#fafafa] rounded-md ">
                                <div className=" gap-4 grid grid-cols-2 items-end">
                                    {fields.map((_, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className=" w-full col-span-1">
                                                <FormField
                                                    control={form.control}
                                                    name={`priceList.${idx}.placeId`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                <span className=" text-red-500">*</span> Place
                                                            </FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className=" w-full">
                                                                        <SelectValue
                                                                            className=" w-full col-span-1"
                                                                            placeholder="Select Place"
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {place?.content.map((place) => (
                                                                        <SelectItem value={place.id}>
                                                                            {place.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                name={`priceList.${idx}.price`}
                                                control={form.control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel className=" text-sm flex items-center">
                                                            <span className=" text-red-500">*</span>
                                                            <p>Price</p>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} placeholder="enter price"/>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => append({id: "", townshipList: []})}
                            className=" disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
                        >
                            <div
                                className=" border gap-3 border-dashed border-dms-50 py-4 flex flex-col items-center justify-center">
                                <IconPlus className=" text-dms-50"/>
                                <p className=" text-sm text-dms-50">Add another one</p>
                            </div>
                        </button>
                    </form>
                </Form>
            </div>
            <div className=" mt-5 flex justify-end gap-4">
                <Button variant="outline" className=" w-[150px] ">
                    Cancel
                </Button>
                <Button
                    className=" bg-dms-50 hover:bg-dms-50 w-[150px]"
                    type="submit"
                    form="form-data"
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default EditTransportation;
