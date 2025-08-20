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
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";
import {formSchemaSchema} from "@/page/places/edit-place/schema.ts";
import {useUpdateWay} from "@/store/server/places/mutation.tsx";
import {useGetPlaceById} from "@/store/server/places/query.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {axios} from "@/common/util/axiox.ts";
import {authJsonToken} from "@/common/util/util.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const EditTeam = () => {
    const param = useParams();
    const form = useForm<z.infer<typeof formSchemaSchema>>({
        defaultValues: {
            name: '',
            place: '',
            minBudget: '0',
            description: '',
            imageUrl: '',
            placeType: ''
        },
        resolver: zodResolver(formSchemaSchema),
    });

    // query
    const { data: placeById } = useGetPlaceById(param?.id?.toString() || "");

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

    // mutation
    const updatePlace = useUpdateWay(param?.id?.toString() || "");

    useEffect(() => {
        if (placeById) {
            form.setValue("name", placeById.name);
            form.setValue("place", placeById?.place);
            form.setValue("minBudget", placeById.minBudget.toString()   );
            form.setValue("description", placeById?.description);
            form.setValue("imageUrl", placeById?.imageUrl);
            form.setValue("placeType", placeById?.placeType);
        }
    }, [placeById]);

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/places"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">Edit Place</p>
            </div>
            <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((val) =>
                            updatePlace.mutate({
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

                            <div className="px-5 py-8 grid grid-cols-3 gap-4 items-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className=" font-[400] gap-1 items-center flex">
                                                <span className="text-red-500">*</span>Image Url
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="enter image url"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className=" px-5 py-8 grid grid-cols-3 gap-4">
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
                                disabled={updatePlace.isPending}
                                type="submit"
                                className=" hover:bg-dms-50 bg-dms-50 h-10 w-[180px]  "
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditTeam;
