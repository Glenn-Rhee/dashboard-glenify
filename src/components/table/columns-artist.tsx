import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import z from "zod";
import { Badge } from "../ui/badge";
import { MoreVertical } from "lucide-react";
import DropdownmenuArtist from "../dropwdownmenu/dropdown-menu-artist";

export const schemaTableArtist = z.object({
  id: z.string(),
  artistName: z.string(),
  bio: z.string(),
  verified: z.boolean(),
  avatarUrl: z.string(),
  createdAt: z.iso.datetime(),
});

export const columnsArtist: ColumnDef<z.infer<typeof schemaTableArtist>>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <span className="block">{row.index + 1}</span>,
  },
  {
    accessorKey: "avatarUrl",
    header: "Profile Image",
    cell: ({ row }) => (
      <Image
        src={row.original.avatarUrl}
        width={60}
        height={60}
        alt={"Profile picture of " + row.original.artistName}
        className="aspect-square object-cover rounded-full"
      />
    ),
  },
  {
    accessorKey: "artistName",
    header: "Artist Name",
    cell: ({ row }) => <span>{row.original.artistName}</span>,
  },
  {
    accessorKey: "verified",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.verified ? "default" : "outline"}>
        {row.original.verified ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("id-ID"),
  },
  {
    id: "action",
    cell: ({ row }) => (
      <DropdownmenuArtist item={row.original}>
        <button className="opacity-0 group-hover/row-artist:opacity-100">
          <MoreVertical className="size-4" />
        </button>
      </DropdownmenuArtist>
    ),
  },
];
