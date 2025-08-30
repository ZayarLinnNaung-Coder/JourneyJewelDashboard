import IconLeft from "@/common/icon/IconLeft";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { useCreateWay } from "@/store/server/places/mutation";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Plus, X } from "lucide-react"; // Make sure you have lucide-react installed

// Define the enum options
const PLACE_TYPES = [
    { value: "BEACH", label: "Beach" },
    { value: "PAGODA", label: "Pagoda" },
    { value: "MOUNTAIN", label: "Mountain" },
    { value: "FOREST", label: "Forest" },
    { value: "LAKE", label: "Lake" },
    { value: "CITY", label: "City" },
    { value: "DESERT", label: "Desert" },
    { value: "VALLEY", label: "Valley" },
];

// Define availability options
const AVAILABILITY_OPTIONS = [
    { value: "true", label: "Available" },
    { value: "false", label: "Unavailable" },
];

const CreatePlace = () => {
    const form = useForm<z.infer<typeof formSchemaSchema>>({
        resolver: zodResolver(formSchemaSchema),
        defaultValues: {
            name: '',
            place: '',
            minBudget: '0',
            description: '',
            imageUrl: '',
            additionalImages: [], // Add this for additional images
            placeType: '',
            isAvailable: 'true' // Default to available
        },
    });

    // Use field array for dynamic additional images
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "additionalImages"
    });

    const way = useCreateWay();

    const handleAddImage = () => {
        append({ url: "" });
    };

    const handleRemoveImage = (index: number) => {
        remove(index);
    };

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/places"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">
                    Create New Place
                    <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to create place manually)
          </span>
                </p>
            </div>
            <div className=" mt-5">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((val) =>
                            way.mutate({
                                name: val.name,
                                place: val.place,
                                minBudget: val.minBudget,
                                description: val.description,
                                imageUrl: val.imageUrl,
                                additionalImages: val.additionalImages, // Include additional images
                                placeType: val.placeType,
                                isAvailable: val.isAvailable // Convert string to boolean
                            })
                        )}
                        className=" space-y-8"
                    >
                        <div className=" bg-white">
                            <div className=" border-b px-5 py-4 font-[500]">
                                <p>Place Details</p>
                            </div>

                            <div className="px-5 pt-8 grid grid-cols-3 gap-4 items-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Main Image
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="enter main image url"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Additional Images Section */}
                            <div className="px-5 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <FormLabel className="font-[400] text-sm">
                                        Additional Images
                                    </FormLabel>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddImage}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Image
                                    </Button>
                                </div>

                                {fields.length > 0 && (
                                    <div className="space-y-3">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex items-end gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`additionalImages.${index}.url`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder={`Additional image ${index + 1} url`}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="flex items-center gap-1 text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className=" px-5 py-8 grid grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="enter name"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="place"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Place
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="enter place"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minBudget"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Min Budget
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" placeholder="enter min budget"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="placeType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Place Type
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select place type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {PLACE_TYPES.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Availability Field - Added as a new row */}
                            <div className=" px-5 pb-4 grid grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="isAvailable"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Availability
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select availability" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {AVAILABILITY_OPTIONS.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className=" px-5 pb-8 grid grid-cols gap-4">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="enter description"/>
                                            </FormControl>
                                            <FormMessage/>
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

export default CreatePlace;