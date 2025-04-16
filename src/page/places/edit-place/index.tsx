import IconLeft from "@/common/icon/IconLeft";
import IconLoder from "@/common/icon/IconLoder";
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

const EditTeam = () => {
    const param = useParams();
    const form = useForm<z.infer<typeof formSchemaSchema>>({
        defaultValues: {
            name: '',
            place: '',
            minBudget: '0',
            description: '',
            imageUrl: ''
        },
        resolver: zodResolver(formSchemaSchema),
    });

    // query
    const { data: placeById } = useGetPlaceById(param?.id?.toString() || "");

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState("https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg");

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const fetchImage = async () => {
                const { data } = await axios.post(
                    `files/upload`,
                    { file: file },
                    {
                        headers: authJsonToken(true),
                    }
                );

                setImagePreview(data.data.url);

                return data;
            };

            fetchImage();
        }
    };

    // mutation
    const updatePlace = useUpdateWay(param?.id?.toString() || "");

    useEffect(() => {
        if (placeById) {
            form.setValue("name", placeById.name);
            form.setValue("place", placeById?.place);
            form.setValue("minBudget", placeById.minBudget.toString()   );
            form.setValue("description", placeById?.description);

            setImagePreview(placeById?.imageUrl);
        }
    }, [placeById]);

    return (
        <div className=" px-5 pt-5">
            <div className=" flex items-center gap-3">
                <Link to={"/places"}>
                    <IconLeft />
                </Link>
                <p className=" text-lg font-[500]">Edit Member</p>
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
                                imageUrl: imagePreview
                            })
                        )}
                        className=" space-y-8"
                    >
                        <div className=" bg-white">
                            <div className=" border-b px-5 py-4 font-[500]">
                                <p>Place Details</p>
                            </div>

                            <div className="px-5 py-8 grid grid-cols-3 gap-4 items-center">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    width="100"
                                    height="100"
                                    className="object-cover rounded"
                                    onClick={handleImageClick}
                                />
                                <input className="hidden" type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange}/>
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
                                                <Input {...field} placeholder="enter sender name"/>
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
