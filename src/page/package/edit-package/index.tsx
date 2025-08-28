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
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";
import { useGetPlaces } from "@/store/server/places/query.tsx";
import { useGetHotelById, useGetHotels } from "@/store/server/hotels/query.tsx";
import { useUpdateHotel } from "@/store/server/hotels/mutation.tsx";
import { useGetpackagesById } from "@/store/server/packages/query.tsx";
import { useCreatepackages, useUpdatepackages } from "@/store/server/packages/mutation.tsx";
import { useGetTransportations } from "@/store/server/transportations/query.tsx";
import { useMerchants } from "@/store/server/merchants/query.tsx";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    placeId: z.string().min(1, "Place is required"),
    hotelId: z.string().min(1, "Hotel is required"),
    merchantId: z.string().min(1, "Merchant is required"),
    transportationId: z.string().min(1, "Transportation is required"),
    selectedRoomType: z.string().min(1, "Room type is required"),
    selectedMealPlan: z.string().min(1, "Meal plan is required")
});

const EditPackage = () => {
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

    const param = useParams();
    const packageId = param?.id?.toString() || "";

    const { data: packageById } = useGetpackagesById(packageId);

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

    const [selectedHotelMealPlans, setSelectedHotelMealPlans] = React.useState<any[]>([]);
    const [selectedHotelRoomTypes, setSelectedHotelRoomTypes] = React.useState<any[]>([]);
    const [isInitialLoad, setIsInitialLoad] = React.useState(true);

    // First effect: Set hotel-dependent data when package loads
    useEffect(() => {
        if (packageById && hotel?.content) {
            const selectedHotel = hotel.content.find(h => h.id === packageById.hotelId);
            if (selectedHotel) {
                setSelectedHotelMealPlans(selectedHotel.mealPlans || []);
                setSelectedHotelRoomTypes(selectedHotel.roomTypes || []);
            }
        }
    }, [packageById, hotel?.content]);

    // Second effect: Populate form after hotel data is set
    useEffect(() => {
        if (packageById && hotel?.content && place?.content && transportation?.content && merchant?.data?.content) {
            const selectedHotel = hotel.content.find(h => h.id === packageById.hotelId);

            // Wait for hotel room types and meal plans to be loaded
            if (selectedHotel && (selectedHotelRoomTypes.length > 0 || selectedHotelMealPlans.length > 0 ||
                (!selectedHotel.roomTypes?.length && !selectedHotel.mealPlans?.length))) {

                console.log('Populating form with:', packageById);

                form.reset({
                    name: packageById.name || "",
                    description: packageById.description || "",
                    price: packageById.price?.toString() || "",
                    placeId: packageById.placeId || "",
                    merchantId: packageById.merchantId || "",
                    transportationId: packageById.transportationId || "",
                    hotelId: packageById.hotelId || "",
                    selectedRoomType: packageById.selectedRoomType || "",
                    selectedMealPlan: packageById.selectedMealPlan || "",
                });

                setIsInitialLoad(false);
            }
        }
    }, [packageById, hotel?.content, place?.content, transportation?.content, merchant?.data?.content, selectedHotelRoomTypes, selectedHotelMealPlans, form]);

    // Update hotel meal plans and room types when hotel selection changes (for manual changes)
    React.useEffect(() => {
        const selectedHotelId = form.watch('hotelId');

        if (selectedHotelId && hotel?.content && !isInitialLoad) {
            const selectedHotel = hotel.content.find(h => h.id === selectedHotelId);

            console.log('Hotel changed manually:', selectedHotel);
            if (selectedHotel) {
                setSelectedHotelMealPlans(selectedHotel.mealPlans || []);
                setSelectedHotelRoomTypes(selectedHotel.roomTypes || []);

                // Reset room type and meal plan for manual hotel changes
                form.setValue("selectedRoomType", "");
                form.setValue("selectedMealPlan", "");
            } else {
                setSelectedHotelMealPlans([]);
                setSelectedHotelRoomTypes([]);
            }
        }
    }, [form.watch('hotelId'), hotel?.content, isInitialLoad, form]);

    const { id } = useParams();
    const updatePackage = useUpdatepackages(id?.toString() || "");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const payload = {
            ...values,
            id: packageId,
            price: parseFloat(values.price) // Convert price to number if needed
        };
        updatePackage.mutate(payload);
    };

    return (
        <div className="px-5 pt-5">
            <div className="flex items-center gap-3">
                <Link to={"/packages"}>
                    <IconLeft />
                </Link>
                <p className="text-lg font-[500]">
                    Edit Package
                    <span className="pl-2 text-sm text-black/50 font-normal">
                        (Update package details)
                    </span>
                </p>
            </div>

            <div className="mt-5 p-5 bg-white">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        id="form-data"
                        name="form-data"
                        className="space-y-5"
                    >
                        <div className="gap-4 grid grid-cols-3 items-end">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm flex items-center">
                                            <span className="text-red-500">*</span>
                                            <p>Name</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter name" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm flex items-center">
                                            <span className="text-red-500">*</span>
                                            <p>Description</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter description" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm flex items-center">
                                            <span className="text-red-500">*</span>
                                            <p>Price</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter price"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="gap-4 grid grid-cols-3 items-end">
                            <FormField
                                control={form.control}
                                name="hotelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Hotel
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Hotel"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {hotel?.content?.map((hotelItem, index) => (
                                                    <SelectItem key={`hotel-${hotelItem.id}-${index}`} value={hotelItem.id}>
                                                        {hotelItem.name}
                                                    </SelectItem>
                                                )) || []}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="selectedRoomType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Room Type
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={!form.watch('hotelId') || selectedHotelRoomTypes.length === 0}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder={
                                                            !form.watch('hotelId')
                                                                ? "Select a hotel first"
                                                                : selectedHotelRoomTypes.length === 0
                                                                    ? "No room types available"
                                                                    : "Select Room Type"
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {selectedHotelRoomTypes && selectedHotelRoomTypes.length > 0
                                                    ? selectedHotelRoomTypes.map((roomType, index) => (
                                                        <SelectItem key={`room-${roomType.roomTypeName}-${index}`} value={roomType.roomTypeName}>
                                                            {roomType.roomTypeName}
                                                        </SelectItem>
                                                    ))
                                                    : null
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="selectedMealPlan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Meal Plan
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={!form.watch('hotelId') || selectedHotelMealPlans.length === 0}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder={
                                                            !form.watch('hotelId')
                                                                ? "Select a hotel first"
                                                                : selectedHotelMealPlans.length === 0
                                                                    ? "No meal plans available"
                                                                    : "Select Meal Plan"
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {selectedHotelMealPlans && selectedHotelMealPlans.length > 0
                                                    ? selectedHotelMealPlans.map((mealPlan, index) => (
                                                        <SelectItem key={`meal-${mealPlan.mealPlanName}-${index}`} value={mealPlan.mealPlanName}>
                                                            {mealPlan.mealPlanName}
                                                        </SelectItem>
                                                    ))
                                                    : null
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="gap-4 grid grid-cols-3 items-end">
                            <FormField
                                control={form.control}
                                name="placeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Place
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Place"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {place?.content?.map((placeItem, index) => (
                                                    <SelectItem key={`place-${placeItem.id}-${index}`} value={placeItem.id}>
                                                        {placeItem.name}
                                                    </SelectItem>
                                                )) || []}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="transportationId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Transportation
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Transportation"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {transportation?.content?.map((transportationItem, index) => (
                                                    <SelectItem key={`transport-${transportationItem.id}-${index}`} value={transportationItem.id}>
                                                        {transportationItem.name}
                                                    </SelectItem>
                                                )) || []}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="merchantId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="text-red-500">*</span> Merchant
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        className="w-full col-span-1"
                                                        placeholder="Select Merchant"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {merchant?.data?.content?.map((merchantItem, index) => (
                                                    <SelectItem key={`merchant-${merchantItem.id}-${index}`} value={merchantItem.id}>
                                                        {merchantItem.name}
                                                    </SelectItem>
                                                )) || []}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="mt-5 flex justify-end gap-4">
                <Link to="/packages">
                    <Button variant="outline" className="w-[150px]">
                        Cancel
                    </Button>
                </Link>
                <Button
                    className="bg-dms-50 hover:bg-dms-50 w-[150px]"
                    type="submit"
                    form="form-data"
                    disabled={updatePackage.isPending}
                >
                    {updatePackage.isPending ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    );
};

export default EditPackage;