import z from "zod";
import { genreSong } from "./columns-request-artist";

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
  totalStreams: z.object({
    month: z.string(),
    totalStreams: z.number(),
  }),
  statusSong: z.enum(["Active", "Suspend", "Banned"]),
});
