import IconLeft from "@/common/icon/IconLeft";
import IconUpload from "@/common/icon/IconUpload";
import { axios } from "@/common/util/axiox";
import { authJsonToken } from "@/common/util/util";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMenu } from "@/store/server/menu/quieries";
import { useEditRole } from "@/store/server/role/mutation";
import { useGetRoleById } from "@/store/server/role/queries";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";

interface generalProps {
  view: string;
  edit: string;
  selectedImage: File | undefined;
  permission: { menuId: string }[];
}

const formSchema = z.object({
  roleName: z.string().min(1, { message: "Role required" }),
  description: z.string().min(1, { message: "Role description required" }),
  imageUrl: z.string(),
  permission: z.object({
    menuPermissions: z.array(
      z.object({
        menuId: z
          .string()
          .min(1, { message: "Menu ID is required" }) // Ensuring menuId is required
          .refine((val) => val.trim() !== "", {
            message: "Menu ID cannot be empty", // Custom error message if menuId is empty
          }),
        permissionTypes: z
          .array(z.string())
          .refine((types) => types.length > 0, {
            message: "At least one permission (view or edit) is required",
          }),
      })
    ),
  }),
});

const EditRole = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      roleName: "",
      description: "",
      imageUrl: "",
      permission: {},
    },
    resolver: zodResolver(formSchema),
  });

  const { id } = useParams();

  const [{ view, edit, selectedImage, permission }, setGeneral] =
    useState<generalProps>({
      view: "VIEW",
      edit: "",
      selectedImage: undefined,
      permission: [],
    });

  const { data } = useMenu();

  const editRole = useEditRole(id?.toString() || "");

  const { data: roleById } = useGetRoleById(id?.toString() || "");

  const per = {
    menuPermissions: permission.map((item) => ({
      menuId: item.menuId,
      permissionTypes: [view, edit].filter((da) => da != ""),
    })),
  };

  useEffect(() => {
    if (selectedImage) {
      try {
        const fetchImage = async () => {
          const { data } = await axios.post(
            `files/upload`,
            { file: selectedImage },
            {
              headers: authJsonToken(true),
            }
          );
          //   setGeneral((pre) => ({ ...pre, imgUrl: data.data.url }));
          form.setValue("imageUrl", data.data.url);
          return data;
        };

        fetchImage();
      } catch (err) {
        console.log(err);
      }
    }
  }, [selectedImage]);

  useEffect(() => {
    if (roleById) {
      form.setValue("roleName", roleById.data.name);
      form.setValue("description", roleById.data.description);
      form.setValue("imageUrl", roleById.data.imageUrl);
      setGeneral((prev) => ({
        ...prev,
        permission: roleById.data.permission.menuPermissions.flatMap(
          (item) => ({
            menuId: item.menuId,
          })
        ),
        view: roleById.data.permission.menuPermissions.map((item) =>
          item.permissionTypes.includes("VIEW") ? "VIEW" : ""
        )?.[0],
        edit: roleById.data.permission.menuPermissions.map((item) =>
          item.permissionTypes.includes("UPDATE") ? "UPDATE" : ""
        )?.[0],
      }));
    }
  }, [roleById]);

  useEffect(() => {
    form.setValue("permission", per);
  }, [per]);

  console.log("edit data");

  const handleCheckboxChange = (menuId: string, isChecked: CheckedState) => {
    setGeneral((prev) => {
      const updatedPermissions = isChecked
        ? [...prev.permission, { menuId }]
        : prev.permission.filter((item) => item.menuId !== menuId);

      return {
        ...prev,
        permission: updatedPermissions,
      };
    });
  };

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/role"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">Edit Role </p>
      </div>
      <div className="  flex items-center justify-center bg-white py-8 w-full mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) => {
              editRole.mutate({
                ...val,
                name: val.roleName,
              });
            })}
            action=""
            className=" space-y-6 w-[400px] "
          >
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Role Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" w-full"
                      placeholder="Role Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className=" text-red-500">*</span>Role Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" w-full"
                      placeholder="Role Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <Label>
                <span className=" text-red-500">*</span>Permission Access
              </Label>
              <div className=" mt-2 flex items-center gap-5">
                <div className=" flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={(val) =>
                      setGeneral((prev) => ({
                        ...prev,
                        view: val == true ? "VIEW" : "",
                      }))
                    }
                    checked={view === "VIEW" ? true : false}
                  />{" "}
                  <span className=" text-sm">VIEW</span>{" "}
                </div>
                <div className=" flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={(val) =>
                      setGeneral((prev) => ({
                        ...prev,
                        edit: val == true ? "UPDATE" : "",
                      }))
                    }
                    checked={edit === "UPDATE" ? true : false}
                  />{" "}
                  <span className=" text-sm">EDIT</span>{" "}
                </div>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="file"
                className="  w-full flex items-center justify-center h-[170px] border-dashed border rounded-lg overflow-hidden object-cover "
              >
                {form.getValues("imageUrl") ? (
                  <>
                    <img
                      src={
                        !selectedImage
                          ? form.getValues("imageUrl")
                          : URL.createObjectURL(selectedImage)
                      }
                      className=" w-full h-full object-cover"
                      alt="image"
                    />
                  </>
                ) : (
                  <IconUpload />
                )}
              </label>
              <input
                onChange={(e) =>
                  e.target.files?.[0] &&
                  setGeneral((prev) => ({
                    ...prev,
                    selectedImage: e.target.files?.[0],
                  }))
                }
                type="file"
                id="file"
                hidden
              />
            </div>

            {data?.data.map((menu) => (
              <Accordion
                className=" rounded-lg border"
                key={menu.id}
                type="single"
                collapsible
              >
                <AccordionItem value={menu.name}>
                  <AccordionTrigger className=" hover:no-underline border-0 py-2 px-2 rounded-none">
                    {menu.name}
                  </AccordionTrigger>
                  <AccordionContent className=" border-t px-2 py-2 space-y-2">
                    {menu.children.map((item) => (
                      <div className="flex items-center gap-2" key={item.id}>
                        <Checkbox
                          onCheckedChange={(val) =>
                            handleCheckboxChange(item.id, val)
                          }
                          checked={permission.some(
                            (da) => da.menuId === item.id
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

            <div className=" flex items-center gap-2">
              <Link
                to={"/team"}
                className="  text-sm w-full rounded-lg h-9 flex items-center justify-center bg-transparent border "
              >
                Cancel
              </Link>
              <Button
                disabled={editRole.isPending}
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

export default EditRole;
