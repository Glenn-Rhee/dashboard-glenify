import z from "zod";
import { genreSong } from "./columns-request-artist";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import DropdownMenuSong from "../dropwdownmenu/dropdown-menu-song";
import { MoreVertical } from "lucide-react";

export const schemaTableSong = z.object({
  id: z.string(),
  coverArt: z.url(),
  songTitle: z.string(),
  artistName: z.string(),
  albumName: z.string(),
  genre: genreSong,
  duration: z.number(), // satuannya detik
  lyric: z.string(),
  audioUrl: z.url(),
  uploadedDate: z.iso.date(),
  totalStreams: z.number(),
  statusSong: z.enum(["Active", "Suspend", "Banned"]),
});

export const columnsSong: ColumnDef<z.infer<typeof schemaTableSong>>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <span className="block">{row.index + 1}</span>,
  },
  {
    accessorKey: "coverArt",
    header: "Cover Art",
    cell: ({ row }) => (
      <Image
        src={"/dummy-prof.jpg"}
        width={60}
        height={60}
        alt={"Cover art song of " + row.original.artistName}
        className="aspect-square object-cover rounded-xl"
      />
    ),
  },
  {
    accessorKey: "songTitle",
    header: "Title",
    cell: ({ row }) => <span>{row.original.songTitle}</span>,
  },
  {
    accessorKey: "artistName",
    header: "Artist Name",
    cell: ({ row }) => <span>{row.original.artistName}</span>,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => <span>{row.original.genre}</span>,
  },
  {
    accessorKey: "totalStreams",
    header: "Total Streams",
    cell: ({ row }) => <span>{row.original.totalStreams.toLocaleString("id-ID")}</span>,
  },
  {
    accessorKey: "statusSong",
    header: "Status Song",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.statusSong === "Active"
            ? "default"
            : row.original.statusSong === "Banned"
              ? "destructive"
              : "outline"
        }
        className={cn(
          row.original.statusSong === "Suspend"
            ? "border-destructive text-destructive font-semibold"
            : "",
        )}
      >
        {row.original.statusSong}
      </Badge>
    ),
  },
  {
    accessorKey: "uploadedDate",
    header: "Joined At",
    cell: ({ row }) =>
      new Date(row.original.uploadedDate).toLocaleDateString("id-ID"),
  },
  {
    id: "action",
    cell: ({ row }) => (
      <DropdownMenuSong item={row.original}>
        <button className="opacity-0 group-hover/row-artist:opacity-100">
          <MoreVertical className="size-4" />
        </button>
      </DropdownMenuSong>
    ),
  },
];
