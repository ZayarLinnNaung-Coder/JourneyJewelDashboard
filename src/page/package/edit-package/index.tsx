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
import {useGetHotelById} from "@/store/server/hotels/query.tsx";
import {useUpdateHotel} from "@/store/server/hotels/mutation.tsx";

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    placeId: z.string(),
    imageUrl: z.string(),
    phoneNumber: z.string(),
    roomTypes: z.array(
        z.object({
            roomTypeName: z.string(),
            price: z.any(),
        })
    ),
    mealPlans: z.array(
        z.object({
            mealPlanName: z.string(),
            price: z.any(),
        })
    ),
});

const EditPackage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            placeId: "",
            phoneNumber: "",
            imageUrl: "",
            roomTypes: [],
            mealPlans: []
        },
    });

    const { fields: roomTypeFields, append: appendRoomType } = useFieldArray({
        control: form.control,
        name: "roomTypes",
    });

    const { fields: mealPlanFields, append: appendMealPlan } = useFieldArray({
        control: form.control,
        name: "mealPlans",
    });

    const { data: place } = useGetPlaces({
        page: 0,
        size: 99999999
    });

    const param = useParams();
    const { data: hotelById } = useGetHotelById(param?.id?.toString() || "");

    useEffect(() => {
        if (hotelById) {
            form.setValue("name", hotelById.name);
            form.setValue("description", hotelById?.description);
            form.setValue("placeId", hotelById?.placeId);
            form.setValue("roomTypes", hotelById?.roomTypes);
            form.setValue("mealPlans", hotelById?.mealPlans);
            form.setValue("phoneNumber", hotelById?.phoneNumber);
            form.setValue("imageUrl", hotelById?.imageUrl);

            console.log(form.getValues())
        }
    }, [hotelById]);

    const updateHotel = useUpdateHotel(param?.id?.toString() || '');

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/hotels"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">
                    Edit Hotels
                    <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to edit transportation)
          </span>
                </p>
            </div>
            <div className=" mt-5 p-5 bg-white">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((val) => updateHotel.mutate(val))}
                        id="form-data"
                        name="form-data"
                        className=" space-y-5"
                        action=""
                    >
                        <div className="gap-4 grid grid-cols-2 items-end">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Name</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter name"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Description</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter description"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="gap-4 grid grid-cols-3 items-end">

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Phone Number</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter phone number"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Image Url</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter image url"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`placeId`}
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

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="card p-5 bg-[#fafafa] rounded-md">
                                    <p className="mb-5">Room Types</p>
                                    <div className="gap-4 grid grid-cols-2 items-end">
                                        {roomTypeFields.map((_, idx) => (
                                            <React.Fragment key={idx}>
                                                <FormField
                                                    name={`roomTypes.${idx}.roomTypeName`}
                                                    control={form.control}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm flex items-center">
                                                                <span className="text-red-500">*</span>
                                                                <p>Room Name</p>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="enter room name"/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name={`roomTypes.${idx}.price`}
                                                    control={form.control}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm flex items-center">
                                                                <span className="text-red-500">*</span>
                                                                <p>Price</p>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="enter price"/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => appendRoomType({roomTypeName: "", price: ""})}
                                        className="mt-7 disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
                                    >
                                        <div
                                            className="border gap-3 border-dashed border-dms-50 py-2 flex flex-col items-center justify-center">
                                            <IconPlus className="text-dms-50"/>
                                            <p className="text-sm text-dms-50">Add another Room Type</p>
                                        </div>
                                    </button>
                                </div>

                                <div className="card p-5 bg-[#fafafa] rounded-md">
                                    <p className="mb-5">Meal Plans</p>
                                    <div className="gap-4 grid grid-cols-2 items-end">
                                        {mealPlanFields.map((_, idx) => (
                                            <React.Fragment key={idx}>
                                                <FormField
                                                    name={`mealPlans.${idx}.mealPlanName`}
                                                    control={form.control}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm flex items-center">
                                                                <span className="text-red-500">*</span>
                                                                <p>Meal Plan Name</p>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="enter meal plan name"/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name={`mealPlans.${idx}.price`}
                                                    control={form.control}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm flex items-center">
                                                                <span className="text-red-500">*</span>
                                                                <p>Price</p>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="enter price"/>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => appendMealPlan({mealPlanName: "", price: ""})}
                                        className="mt-7 disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
                                    >
                                        <div
                                            className="border gap-3 border-dashed border-dms-50 py-2 flex flex-col items-center justify-center">
                                            <IconPlus className="text-dms-50"/>
                                            <p className="text-sm text-dms-50">Add another Meal Plan</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
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

export default EditPackage;
