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
import { Button } from "@/components/ui/button";
import { useCreateWay } from "@/store/server/places/mutation";
import {Textarea} from "@/components/ui/textarea.tsx";

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

const CreatePlace = () => {
    const form = useForm<z.infer<typeof formSchemaSchema>>({
        resolver: zodResolver(formSchemaSchema),
        defaultValues: {
            name: '',
            place: '',
            minBudget: '0',
            description: '',
            imageUrl: '',
            placeType: '' // Add this to your schema
        },
    });

    const way = useCreateWay();

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
                                placeType: val.placeType // Include this in the mutation
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
                                                <span className="text-red-500">*</span>Image
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="enter image url"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
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