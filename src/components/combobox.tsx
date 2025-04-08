import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useMemo } from "react";

interface ComboboxProps {
  data: {
    label: string;
    value: string;
  }[];
  setSelected: React.Dispatch<React.SetStateAction<dataProps[] | undefined>>;
  selected: dataProps[] | undefined;
  onChange?: (values: string[]) => void; // <- new prop
}

interface dataProps {
  label: string;
  value: string;
}

export default function Combobox({
  data,
  selected,
  setSelected,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = useCallback(
    (country: dataProps) => {
      const newSelected = selected?.filter((s) => s.value !== country.value);
      setSelected(newSelected);
      onChange?.(newSelected?.map((item) => item.value) ?? []);
    },
    [setSelected, selected, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && selected && selected?.length > 0) {
        const newSelected = selected.slice(0, -1);
        setSelected(newSelected);
        onChange?.(newSelected.map((item) => item.value));
      }
    },
    [selected, setSelected, onChange]
  );

  const filteredCountries = useMemo(() => {
    return data?.filter(
      (country) => !selected?.some((s) => s.value === country.value)
    );
  }, [data, selected]);

  return (
    <div className="w-full translate-y-1.5 ">
      <Command className="overflow-visible">
        <div className="rounded-md border overflow-hidden border-input px-3 py-2 text-sm ">
          <div className="flex flex-wrap gap-2 ">
            {selected?.map((country) => {
              return (
                <Badge
                  onClick={() => handleUnselect(country)}
                  key={country.value}
                  variant="secondary"
                  className="select-none pointer-events-auto"
                >
                  {country.label}
                  <X
                    className="size-3 text-muted-foreground hover:text-foreground z-30 ml-2 cursor-pointer"
                    onClick={(e) => {
                      console.log("hello");

                      e.stopPropagation();
                      handleUnselect(country);
                    }}
                  />
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              onKeyDown={handleKeyDown}
              onValueChange={setInputValue}
              value={inputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select countries..."
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && !!filteredCountries.length && (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                <CommandGroup className="h-full overflow-auto">
                  {filteredCountries.map((country) => {
                    return (
                      <CommandItem
                        key={country.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onSelect={() => {
                          const alreadySelected = selected?.some(
                            (s) => s.value === country.value
                          );
                          if (alreadySelected) return;

                          const newSelected = selected
                            ? [...selected, country]
                            : [country];

                          setInputValue("");
                          setSelected(newSelected);
                          onChange?.(newSelected.map((item) => item.value));
                        }}
                        className={"cursor-pointer"}
                      >
                        {country.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}
