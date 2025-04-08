import IconLeft from "@/common/icon/IconLeft";
import IconPlus from "@/common/icon/IconPlus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCity } from "@/store/server/city/queries";
import { useCountry } from "@/store/server/country/query";
import { useCreateZone } from "@/store/server/zone/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  countryId: z.string(),
  cities: z.array(
    z.object({
      id: z.string().nonempty("City is required"),
      townshipList: z.array(z.string()),
    })
  ),
});

const CreateZone = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      countryId: "",
      cities: [
        {
          id: "",
          townshipList: [""],
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "cities",
  });

  const { data: countries } = useCountry();
  const { data: cities } = useCity();

  const createZone = useCreateZone();

  const township = [
    {
      label: "Dawbon",
      value: "dawbon",
    },
    {
      label: "Yay Kyaw",
      value: "yaykyaw",
    },
    {
      label: "Thu Wanna",
      value: "thuwanna",
    },
  ];

  return (
    <div className=" px-5 pt-5">
      <div className=" flex items-center gap-3">
        <Link to={"/team"}>
          <IconLeft />
        </Link>
        <p className=" text-lg font-[500]">
          Create Zone
          <span className=" pl-2 text-sm text-black/50 font-normal">
            (Place to create delivery zone)
          </span>
        </p>
      </div>
      <div className=" mt-5 p-5 bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((val) => createZone.mutate(val))}
            id="form-data"
            name="form-data"
            className=" space-y-5"
            action=""
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-sm flex items-center">
                    <span className=" text-red-500">*</span>
                    <p>Zone Name</p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="enter zone name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className=" gap-4 grid grid-cols-3 items-end">
              {fields.map((_, idx) => (
                <React.Fragment key={idx}>
                  <div className=" w-full col-span-1">
                    <FormField
                      control={form.control}
                      name="countryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className=" text-red-500">*</span> Country
                          </FormLabel>
                          <Select
                            disabled={idx !== 0}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className=" w-full">
                                <SelectValue
                                  className=" w-full col-span-1"
                                  placeholder="Select Country"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries?.data.content.map((country) => (
                                <SelectItem value={country.id}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`cities.${idx}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className=" text-red-500">*</span> City
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className=" w-full">
                              <SelectValue
                                className=" w-full col-span-1"
                                placeholder="Select City"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities?.data.content.map((city) => (
                              <SelectItem value={city.id}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`cities.${idx}.townshipList`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="text-red-500">*</span> Township
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full px-2 font-normal justify-start"
                              >
                                {township.filter((t) =>
                                  field.value.includes(t.value)
                                ).length > 0
                                  ? township
                                      .filter((t) =>
                                        field.value.includes(t.value)
                                      )
                                      .map((t) => (
                                        <Badge variant="outline">
                                          {t.label}
                                        </Badge>
                                      ))
                                  : "Select Townships..."}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[350px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search townships..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No township found.</CommandEmpty>
                                <CommandGroup>
                                  {township.map((town) => (
                                    <CommandItem
                                      key={town.value}
                                      onSelect={() => {
                                        const isSelected = field.value.includes(
                                          town.value
                                        );
                                        const newValue = isSelected
                                          ? field.value.filter(
                                              (v: string) => v !== town.value
                                            )
                                          : [...field.value, town.value];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      {town.label}
                                      <Check
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value.includes(town.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ id: "", townshipList: [] })}
              className=" disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
            >
              <div className=" border gap-3 border-dashed border-dms-50 py-4 flex flex-col items-center justify-center">
                <IconPlus className=" text-dms-50" />
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
          disabled={createZone.isPending}
          className=" bg-dms-50 hover:bg-dms-50 w-[150px]"
          type="submit"
          form="form-data"
        >
          Add Zone
        </Button>
      </div>
    </div>
  );
};

export default CreateZone;
