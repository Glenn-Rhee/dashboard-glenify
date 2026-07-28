"use client";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ListChevronsUpDownIcon } from "lucide-react";

const itemsRange = [
  "> Greather Than",
  "< Less Than",
  "≥ Greater Than or Equal",
  "≤ Less Than or Equal",
  "= Equal",
];

export default function FilterArtist() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ListChevronsUpDownIcon className="size-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          console.log("target:", e.target);
          console.log(
            "closest popper:",
            (e.target as HTMLElement).closest(
              "[data-radix-popper-content-wrapper]",
            ),
          );
        }}
      >
        <DialogHeader>
          <DialogTitle>Filter Artist List</DialogTitle>
          <DialogDescription>
            Filter and customize the artist list to find what you need.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>Total Songs</FieldLabel>
            <div className="flex items-center gap-x-2">
              <Combobox items={itemsRange}>
                <ComboboxInput className={"w-36"} placeholder="Select range" />
                <ComboboxContent
                  onContextMenu={(e) => e.stopPropagation()}
                  className="z-60"
                >
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        key={item}
                        value={item}
                      >
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <Input
                placeholder="19"
                className="w-16"
                type="text"
                inputMode="numeric"
              />
            </div>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
