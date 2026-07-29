"use client";
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
import { cn } from "@/lib/utils";
import FormSchema from "@/types/form-schema";
import { ChevronDown, ListChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getNumbersOnly } from "@/helper/getNumbersOnly";
import { DatePicker } from "@/components/DatePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCOUNT_STATUS, VERIFICATION_STATUS } from "@/helper/artist-helper";

const rangeItem = new Map([
  ["GT", ">"],
  ["LT", "<"],
  ["GTE", "≥"],
  ["LTE", "≤"],
  ["E", "="],
  ["None", "Select Range"],
]);

type FilterForm = z.input<typeof FormSchema.filterArtist>;

export default function FilterArtist() {
  const [openPopover, setOpenPopover] = useState<{
    song: boolean;
    album: boolean;
    follower: boolean;
    streams: boolean;
    verifStatus: boolean;
    accStatus: boolean;
  }>({
    song: false,
    album: false,
    follower: false,
    streams: false,
    verifStatus: false,
    accStatus: false,
  });
  const form = useForm<FilterForm>({
    resolver: zodResolver(FormSchema.filterArtist),
    defaultValues: {
      rangeSong: "None",
      totalSong: undefined,
      rangeAlbum: "None",
      totalAlbum: undefined,
      rangeFollowers: "None",
      totalFollowers: undefined,
      rangeStreams: "None",
      totalStreams: undefined,
      rangeDateJoin: {
        from: undefined,
        to: undefined,
      },
      accountStatus: undefined,
      verificationStatus: undefined,
    },
  });

  const handleSubmit = (data: FilterForm) => {
    const activeFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => {
        if (value === undefined || value === null) return false;
        if (typeof value === "string" && value === "None") return false;
        if (value === 0) return false;
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
          <DialogTitle>Filter Artist List</DialogTitle>
          <DialogDescription>
            Filter and customize the artist list to find what you need.
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
              <Field>
                <FieldLabel htmlFor="totalSongs">Total Songs</FieldLabel>
                <div className="flex gap-x-1">
                  <Controller
                    control={form.control}
                    name="rangeSong"
                    render={({ field }) => (
                      <div className="flex items-center gap-x-2">
                        <Popover
                          open={openPopover.song}
                          onOpenChange={(open) =>
                            setOpenPopover((prev) => ({
                              ...prev,
                              song: !!open,
                            }))
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
                            {rangeItem.get(field.value || "")}{" "}
                            <ChevronDown
                              className={cn(
                                "size-3",
                                openPopover.song
                                  ? "rotate-180 transition-all duration-300"
                                  : "rotate-0",
                              )}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <ul className="flex flex-col gap-y-2">
                              {[...rangeItem].map(([key, value]) => (
                                <li
                                  onClick={() => {
                                    form.setValue(
                                      "rangeSong",
                                      key as FilterForm["rangeSong"],
                                    );
                                    setOpenPopover((prev) => ({
                                      ...prev,
                                      song: !!open,
                                    }));
                                  }}
                                  className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                                  key={key}
                                >
                                  {value}
                                </li>
                              ))}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="totalSong"
                    render={({ field, fieldState }) => (
                      <Input
                        id="totalSongs"
                        {...field}
                        onChange={(e) => {
                          const onlyNumbers = getNumbersOnly(e);

                          field.onChange(onlyNumbers);
                        }}
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                        placeholder="19"
                        className="w-16"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  />
                </div>
                {form.formState.errors.totalSong && (
                  <FieldError errors={[form.formState.errors.totalSong]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="totalAlbums">Total Albums</FieldLabel>
                <div className="flex gap-x-1">
                  <Controller
                    control={form.control}
                    name="rangeAlbum"
                    render={({ field }) => (
                      <div className="flex items-center gap-x-2">
                        <Popover
                          open={openPopover.album}
                          onOpenChange={(open) =>
                            setOpenPopover((prev) => ({
                              ...prev,
                              album: !!open,
                            }))
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
                            {rangeItem.get(field.value || "")}{" "}
                            <ChevronDown
                              className={cn(
                                "size-3",
                                openPopover.album
                                  ? "rotate-180 transition-all duration-300"
                                  : "rotate-0",
                              )}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <ul className="flex flex-col gap-y-2">
                              {[...rangeItem].map(([key, value]) => (
                                <li
                                  onClick={() => {
                                    form.setValue(
                                      "rangeAlbum",
                                      key as FilterForm["rangeAlbum"],
                                    );
                                    setOpenPopover((prev) => ({
                                      ...prev,
                                      album: false,
                                    }));
                                  }}
                                  className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                                  key={key}
                                >
                                  {value}
                                </li>
                              ))}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="totalAlbum"
                    render={({ field, fieldState }) => (
                      <Input
                        id="totalAlbums"
                        {...field}
                        onChange={(e) => {
                          const onlyNumbers = getNumbersOnly(e);

                          field.onChange(onlyNumbers);
                        }}
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                        placeholder="19"
                        className="w-16"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  />
                </div>
                {form.formState.errors.totalAlbum && (
                  <FieldError errors={[form.formState.errors.totalAlbum]} />
                )}
              </Field>
            </div>
            <div className="flex items-center w-full justify-between gap-x-4">
              <Field>
                <FieldLabel htmlFor="totalFollowers">
                  Total Followers
                </FieldLabel>
                <div className="flex gap-x-1">
                  <Controller
                    control={form.control}
                    name="rangeFollowers"
                    render={({ field }) => (
                      <div className="flex items-center gap-x-2">
                        <Popover
                          open={openPopover.follower}
                          onOpenChange={(open) =>
                            setOpenPopover((prev) => ({
                              ...prev,
                              follower: !!open,
                            }))
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
                            {rangeItem.get(field.value || "")}{" "}
                            <ChevronDown
                              className={cn(
                                "size-3",
                                openPopover.follower
                                  ? "rotate-180 transition-all duration-300"
                                  : "rotate-0",
                              )}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <ul className="flex flex-col gap-y-2">
                              {[...rangeItem].map(([key, value]) => (
                                <li
                                  onClick={() => {
                                    form.setValue(
                                      "rangeFollowers",
                                      key as FilterForm["rangeFollowers"],
                                    );
                                    setOpenPopover((prev) => ({
                                      ...prev,
                                      follower: false,
                                    }));
                                  }}
                                  className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                                  key={key}
                                >
                                  {value}
                                </li>
                              ))}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="totalFollowers"
                    render={({ field, fieldState }) => (
                      <Input
                        id="totalFollowers"
                        {...field}
                        onChange={(e) => {
                          const onlyNumbers = getNumbersOnly(e);

                          field.onChange(onlyNumbers);
                        }}
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                        placeholder="19"
                        className="w-16"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  />
                </div>
                {form.formState.errors.totalFollowers && (
                  <FieldError errors={[form.formState.errors.totalFollowers]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="totalStreams">Total Streams</FieldLabel>
                <div className="flex gap-x-1">
                  <Controller
                    control={form.control}
                    name="rangeStreams"
                    render={({ field }) => (
                      <div className="flex items-center gap-x-2">
                        <Popover
                          open={openPopover.streams}
                          onOpenChange={(open) =>
                            setOpenPopover((prev) => ({
                              ...prev,
                              streams: !!open,
                            }))
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
                            {rangeItem.get(field.value || "")}{" "}
                            <ChevronDown
                              className={cn(
                                "size-3",
                                openPopover.streams
                                  ? "rotate-180 transition-all duration-300"
                                  : "rotate-0",
                              )}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <ul className="flex flex-col gap-y-2">
                              {[...rangeItem].map(([key, value]) => (
                                <li
                                  onClick={() => {
                                    form.setValue(
                                      "rangeStreams",
                                      key as FilterForm["rangeStreams"],
                                    );
                                    setOpenPopover((prev) => ({
                                      ...prev,
                                      streams: false,
                                    }));
                                  }}
                                  className="cursor-pointer py-1.5 px-2 hover:bg-slate-700/20 transition-all duration-100 rounded-md"
                                  key={key}
                                >
                                  {value}
                                </li>
                              ))}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="totalStreams"
                    render={({ field, fieldState }) => (
                      <Input
                        id="totalStreams"
                        {...field}
                        onChange={(e) => {
                          const onlyNumbers = getNumbersOnly(e);

                          field.onChange(onlyNumbers);
                        }}
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                        placeholder="19"
                        className="w-16"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  />
                </div>
                {form.formState.errors.totalStreams && (
                  <FieldError errors={[form.formState.errors.totalStreams]} />
                )}
              </Field>
            </div>
            <Controller
              control={form.control}
              name="rangeDateJoin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rangeDateJoin">Joined At</FieldLabel>
                  <DatePicker
                    dateRange={{
                      from: field.value?.from,
                      to: field.value?.from,
                    }}
                    onDateChange={field.onChange}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center w-full justify-between gap-x-4">
              <Controller
                control={form.control}
                name="verificationStatus"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="verificationStatus">
                      Verification Status
                    </FieldLabel>
                    <DropdownMenu
                      open={openPopover.verifStatus}
                      onOpenChange={(open) =>
                        setOpenPopover((prev) => ({
                          ...prev,
                          verifStatus: open,
                        }))
                      }
                      modal={false}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="flex items-center justify-between"
                        >
                          {field.value || (
                            <>
                              Select Status <ChevronDown className="size-3" />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {VERIFICATION_STATUS.map((vs) => (
                          <DropdownMenuItem
                            onClick={() => {
                              field.onChange(vs);
                            }}
                            key={vs}
                          >
                            {vs}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="accountStatus"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="accountStatus">
                      Account Status
                    </FieldLabel>
                    <DropdownMenu
                      open={openPopover.accStatus}
                      onOpenChange={(open) =>
                        setOpenPopover((prev) => ({
                          ...prev,
                          accStatus: open,
                        }))
                      }
                      modal={false}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="flex items-center justify-between"
                        >
                          {field.value || (
                            <>
                              Select Status <ChevronDown className="size-3" />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {ACCOUNT_STATUS.map((vs) => (
                          <DropdownMenuItem
                            onClick={() => {
                              field.onChange(vs);
                            }}
                            key={vs}
                          >
                            {vs}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Field>
                )}
              />
            </div>
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
