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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import {useCreateHotels} from "@/store/server/hotels/mutation.tsx";
import {useGetPlaces} from "@/store/server/places/query.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {useGetHotels} from "@/store/server/hotels/query.tsx";
import {useGetTransportations} from "@/store/server/transportations/query.tsx";
import {useCreatepackages} from "@/store/server/packages/mutation.tsx";
import {useMerchant} from "@/store/server/merchants/mutation.tsx";
import merchants from "@/page/merchants";
import {useMerchants} from "@/store/server/merchants/query.tsx";

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    placeId: z.string(),
    hotelId: z.string(),
    merchantId: z.string(),
    transportationId: z.string(),
    selectedRoomType: z.string(),
    selectedMealPlan: z.string(),
});

const AddPackage = () => {
    const [selectedHotelMealPlans, setSelectedHotelMealPlans] = React.useState<any[]>([]);
    const [selectedHotelRoomTypes, setSelectedHotelRoomTypes] = React.useState<any[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            placeId: "",
            merchantId: "",
            transportationId: "",
            hotelId: "",
            selectedRoomType: "",
            selectedMealPlan: "",
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

    const createpackages = useCreatepackages();

    const { data: place } = useGetPlaces({
        page: 0,
        size: 99999999
    });

    const { data: hotel } = useGetHotels({
        page: 0,
        size: 99999999
    });

    const { data: transportation } = useGetTransportations({
        page: 0,
        size: 99999999
    });

    const { data: merchant } = useMerchants({
        page: 0,
        size: 99999999
    });

    React.useEffect(() => {
        const selectedHotel = hotel?.content.find(h => h.id === form.getValues('hotelId'));
        console.log(hotel)
        console.log(selectedHotel);
        console.log("*********************")
        if (selectedHotel) {
            setSelectedHotelMealPlans(selectedHotel.mealPlans || []);
            setSelectedHotelRoomTypes(selectedHotel.roomTypes || []);
        }
    }, [form.watch('hotelId'), hotel]);

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/packages"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">
                    Create New Pcakage
                    <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to create package)
          </span>
                </p>
            </div>
            <div className=" mt-5 p-5 bg-white">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((val) => createpackages.mutate(val))}
                        id="form-data"
                        name="form-data"
                        className=" space-y-5"
                        action=""
                    >
                        <div className="gap-4 grid grid-cols-3 items-end">
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
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" text-sm flex items-center">
                                            <span className=" text-red-500">*</span>
                                            <p>Price</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="enter price"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="gap-4 grid grid-cols-3 items-end">

                            <FormField
                                control={form.control}
                                name={`hotelId`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className=" text-red-500">*</span> Hotel
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className=" w-full">
                                                    <SelectValue
                                                        className=" w-full col-span-1"
                                                        placeholder="Select Hotel"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {hotel?.content.map((hotel) => (
                                                    <SelectItem value={hotel.id}>
                                                        {hotel.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="selectedRoomType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className=" text-red-500">*</span> Room Type
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Room Type"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {selectedHotelRoomTypes.map((roomType, index) => (
                                                    <SelectItem key={index} value={roomType.roomTypeName}>
                                                        {roomType.roomTypeName} - ${roomType.price}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="selectedMealPlan"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className=" text-red-500">*</span> Meal Plan
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Meal Plan"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {selectedHotelMealPlans.map((mealPlan, index) => (
                                                    <SelectItem key={index} value={mealPlan.mealPlanName}>
                                                        {mealPlan.mealPlanName} - ${mealPlan.price}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="gap-4 grid grid-cols-3 items-end">

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

                            <FormField
                                control={form.control}
                                name={`transportationId`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className=" text-red-500">*</span> Transportation
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className=" w-full">
                                                    <SelectValue
                                                        className=" w-full col-span-1"
                                                        placeholder="Select Transportation"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {transportation?.content.map((transportation) => (
                                                    <SelectItem value={transportation.id}>
                                                        {transportation.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`merchantId`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className=" text-red-500">*</span> Merchant
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className=" w-full">
                                                    <SelectValue
                                                        className=" w-full col-span-1"
                                                        placeholder="Select Merchant"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {merchant?.data?.content.map((m) => (
                                                    <SelectItem value={m.id}>
                                                        {m.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

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
                    Add
                </Button>
            </div>
        </div>
    );
};

export default AddPackage;
