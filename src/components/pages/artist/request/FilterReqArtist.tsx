"use client";
import { DatePicker } from "@/components/DatePicker";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GENRE_ARTIST, STATUS_APPROVAL_ARTIST } from "@/helper/artist-helper";
import { cn } from "@/lib/utils";
import FormSchema from "@/types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ListChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type FilterForm = z.input<typeof FormSchema.filterReqArtist>;

export default function FilterReqArtist() {
  const [openPopover, setOpenPopover] = useState({
    genre: false,
    status: false,
  });
  const [otherGenreValue, setOtherGenreValue] = useState("");
  const [showOtherGenre, setShowOtherGenre] = useState<boolean>(false);

  const form = useForm<FilterForm>({
    resolver: zodResolver(FormSchema.filterReqArtist),
    defaultValues: {
      genre: "None",
      rangeDateReq: undefined,
      status: "None",
    },
  });

  const handleSubmit = (data: FilterForm) => {
    const activeFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => {
        if (value === undefined || value === null) return false;
        if (typeof value === "string" && value === "None") return false;
        if (
          typeof value === "object" &&
          value.from === undefined &&
          value.to === undefined
        )
          return false;
        return true;
      }),
    );
    if (Object.keys(activeFilters).length === 0) return;
    const valueOtherGenre = otherGenreValue.trim();
    if (
      activeFilters["genre"] &&
      activeFilters["genre"] === "Other" &&
      valueOtherGenre === ""
    ) {
      form.setError("genre", { message: "Please fill your other genre" });
      return;
    }

    // Do something here..
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ListChevronsUpDownIcon className="size-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="w-4xl">
        <DialogHeader>
          <DialogTitle>Filter Reuest Artist List</DialogTitle>
          <DialogDescription>
            Filter and customize the request artist list to find what you need.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }}
        >
          <FieldGroup>
            <div className="flex items-center w-full justify-between gap-x-4">
              <Controller
                control={form.control}
                name="genre"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="genre">Genre</FieldLabel>
                    <Popover
                      open={openPopover.genre}
                      onOpenChange={(open) =>
                        setOpenPopover((prev) => ({ ...prev, genre: !!open }))
                      }
                    >
                      <PopoverTrigger
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            className: "w-32 flex justify-between",
                          }),
                        )}
                      >
                        {field.value === "None" ? "Select Genre" : field.value}
                        <ChevronDown
                          className={cn(
                            "size-3",
                            openPopover.genre
                              ? "rotate-180 transition-all duration-300"
                              : "rotate-0",
                          )}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        side="left"
                        align="start"
                        sideOffset={4}
                        className="w-48"
                      >
                        <ul className="flex flex-col gap-y-2">
                          {GENRE_ARTIST.map((g, i) => (
                            <li
                              onClick={() => {
                                if (g === "Other") {
                                  setShowOtherGenre(true);
                                } else {
                                  setShowOtherGenre(false);
                                }
                                form.setValue("genre", g);
                                setOpenPopover((prev) => ({
                                  ...prev,
                                  genre: false,
                                }));
                              }}
                              className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                              key={g + i}
                            >
                              {g === "None" ? "Select Genre" : g}
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                    {showOtherGenre ? (
                      <Input
                        aria-invalid={fieldState.invalid}
                        value={otherGenreValue}
                        onChange={(e) => setOtherGenreValue(e.target.value)}
                        placeholder="Fill your other genre"
                        inputMode="text"
                      />
                    ) : null}
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="status">Status Approval</FieldLabel>
                    <Popover
                      open={openPopover.status}
                      onOpenChange={(open) =>
                        setOpenPopover((prev) => ({ ...prev, status: !!open }))
                      }
                    >
                      <PopoverTrigger
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            className: "w-32 flex justify-between",
                          }),
                        )}
                      >
                        {field.value === "None" ? "Select Status" : field.value}
                        <ChevronDown
                          className={cn(
                            "size-3",
                            openPopover.status
                              ? "rotate-180 transition-all duration-300"
                              : "rotate-0",
                          )}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <ul className="flex flex-col gap-y-2">
                          {STATUS_APPROVAL_ARTIST.map((status, i) => (
                            <li
                              onClick={() => {
                                form.setValue("status", status);
                                setOpenPopover((prev) => ({
                                  ...prev,
                                  status: false,
                                }));
                              }}
                              className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                              key={status + i}
                            >
                              {status === "None" ? "Select Status" : status}
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              />
            </div>
            <Controller
              control={form.control}
              name="rangeDateReq"
              render={({ field, fieldState }) => {
                const fromError = form.formState.errors.rangeDateReq?.from;
                const toError = form.formState.errors.rangeDateReq?.to;
                const rootError = form.formState.errors.rangeDateReq?.root;

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="rangeDateReq">Requested At</FieldLabel>
                    <DatePicker
                      dateRange={{
                        from: field.value?.from,
                        to: field.value?.to,
                      }}
                      onDateChange={field.onChange}
                    />
                    {(fromError || toError || rootError) && (
                      <FieldError
                        errors={[fromError, toError, rootError].filter(Boolean)}
                      />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(handleSubmit)} type="submit">
              Apply Filter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
