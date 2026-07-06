import z from "zod";

export const schemaTableArtist = z.object({
  id: z.string(),
  artistName: z.string(),
  bio: z.string(),
  verified: z.boolean(),
  avatarUrl: z.string(),
  createdAt: z.iso.datetime(),
});
