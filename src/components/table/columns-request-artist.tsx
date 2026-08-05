import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLinkIcon,
  FileTextIcon,
  MailIcon,
  MoreVertical,
  PhoneIcon,
} from "lucide-react";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import DropdownmenuRequestArtist from "../dropwdownmenu/dropdown-menu-req-artist";

export const schemaTableReqArtist = z.object({
  id: z.string(),
  artistName: z.string(),
  fullName: z.string(),
  avatarUrl: z.url(),
  bio: z.string(),
  genre: z.string(),
  portfolioUrl: z.string().url().optional(),
  identityNumber: z.string(),
  documentUrl: z.string(),
  phoneNumber: z.string(),
  email: z.email(),
  rejectionReason: z.string().optional(),
  requestDate: z.iso.datetime(),
  status: z.enum(["Pending", "Approved", "Rejected"]),
});

export function ArtistRequestDetail({
  item,
  open,
  onOpenChange,
}: {
  item: z.infer<typeof schemaTableReqArtist>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  function maskIdentityNumber(value: string) {
    if (value.length <= 8) return value;
    const start = value.slice(0, 4);
    const end = value.slice(-4);
    return `${start}${"*".repeat(value.length - 8)}${end}`;
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <div className="flex items-center gap-3">
            <Image
              src={"/dummy-prof.jpg"}
              alt={item.artistName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <DrawerTitle>{item.artistName}</DrawerTitle>
              <DrawerDescription>
                Requested on{" "}
                {new Date(item.requestDate).toLocaleDateString("id-ID")}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {/* --- Informasi Dasar --- */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <Label htmlFor="artistName">Artist Name</Label>
              <Input id="artistName" defaultValue={item.artistName} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={item.fullName} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" defaultValue={item.genre} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={item.bio} readOnly rows={3} />
            </div>
          </div>

          <Separator />

          {item.portfolioUrl && (
            <>
              <div className="flex flex-col gap-3">
                <Label>Portfolio</Label>
                <Link
                  href={item.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  {item.portfolioUrl}
                </Link>
              </div>
              <Separator />
            </>
          )}

          {/* --- Kontak --- */}
          <div className="flex flex-col gap-3">
            <Label>Contact Information</Label>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MailIcon className="h-4 w-4" />
              {item.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <PhoneIcon className="h-4 w-4" />
              {item.phoneNumber}
            </div>
          </div>

          <Separator />

          {/* --- Verifikasi Identitas --- */}
          <div className="flex flex-col gap-3">
            <Label>Identity Verification</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-muted-foreground text-xs">ID Number</span>
                <span className="font-medium">
                  {maskIdentityNumber(item.identityNumber)}
                </span>
              </div>
              <Link
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-primary hover:bg-muted/50"
              >
                <FileTextIcon className="h-4 w-4" />
                View Supporting Document
              </Link>
            </div>
          </div>

          <Separator />

          {/* --- Status --- */}
          <div className="flex flex-col gap-3">
            <Label>Status</Label>
            <Badge
              variant={
                item.status === "Approved"
                  ? "default"
                  : item.status === "Rejected"
                    ? "destructive"
                    : "outline"
              }
              className="w-fit"
            >
              {item.status}
            </Badge>
          </div>

          {/* --- Alasan Penolakan (kalau ada) --- */}
          {item.status === "Rejected" && item.rejectionReason && (
            <div className="flex flex-col gap-3">
              <Label>Rejection Reason</Label>
              <Textarea
                defaultValue={item.rejectionReason}
                readOnly
                rows={2}
                className="text-muted-foreground"
              />
            </div>
          )}
        </div>

        <DrawerFooter>
          {item.status === "Pending" ? (
            <div className="flex gap-2">
              <Button className="flex-1">Approve</Button>
              <Button variant="destructive" className="flex-1">
                Reject
              </Button>
            </div>
          ) : null}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const columns: ColumnDef<z.infer<typeof schemaTableReqArtist>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <span className="block">{row.index + 1}</span>,
  },
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Image
        src={"/dummy-prof.jpg"}
        alt={"Image of " + row.original.artistName}
        width={70}
        height={70}
        className="object-cover rounded-full"
      />
    ),
  },
  {
    accessorKey: "artistName",
    header: "Artist Name",
    cell: ({ row }) => {
      return <span>{row.original.artistName}</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => {
      return <span>{row.original.genre}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "Approved"
            ? "default"
            : row.original.status === "Pending"
              ? "secondary"
              : "destructive"
        }
        className="px-1.5"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "requestDate",
    header: "Requested At",
    cell: ({ row }) => (
      <span className="block">
        {new Date(row.original.requestDate).toLocaleDateString("id-ID")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownmenuRequestArtist item={row.original}>
        <button>
          <MoreVertical className="size-5" />
        </button>
      </DropdownmenuRequestArtist>
    ),
    // row.original.status === "Pending" ? (
    //   <div className="flex items-center justify-center gap-x-3">
    //     <Button size={"sm"}>Approved</Button>
    //     <Button size={"sm"} variant={"destructive"}>
    //       Rejected
    //     </Button>
    //     <TableCellViewer item={row.original} />
    //   </div>
    // ) : (
    //   <div className="w-full flex items-center justify-center">
    //     <TableCellViewer item={row.original} />
    //   </div>
    // ),
  },
];
