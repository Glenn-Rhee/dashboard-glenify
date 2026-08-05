import {
  baseGenreArtistValue,
  baseStatusReqArtistValue,
} from "@/components/table/columns-request-artist";
import z from "zod";

export default class FormSchema {
  static readonly filterArtist = z
    .object({
      rangeSong: z
        .enum(["GT", "LT", "GTE", "LTE", "E", "None"])
        .default("None"),
      rangeAlbum: z
        .enum(["GT", "LT", "GTE", "LTE", "E", "None"])
        .default("None"),
      rangeFollowers: z
        .enum(["GT", "LT", "GTE", "LTE", "E", "None"])
        .default("None"),
      rangeStreams: z
        .enum(["GT", "LT", "GTE", "LTE", "E", "None"])
        .default("None"),

      totalSong: z
        .number({ error: "Please fill Total Song Properly" })
        .min(1, { error: "Minimum of song is 1" })
        .optional(),
      totalAlbum: z
        .number({ error: "Please fill Total Album Properly" })
        .min(1, { error: "Minimum of total albuum is 1" })
        .optional(),
      totalFollowers: z
        .number({ error: "Please fill Total Followers Properly" })
        .min(1, { error: "Minimum of total followers is 1" })
        .optional(),
      totalStreams: z
        .number({ error: "Please fill Total Streams Properly" })
        .min(1, { error: "Minimum of total streams is 1" })
        .optional(),

      rangeDateJoin: z
        .object({
          from: z.date({ error: "Please fill properly" }).optional(),
          to: z.date({ error: "Please fill properly" }).optional(),
        })
        .optional(),

      verificationStatus: z.enum(["Verified", "Unverified"]).optional(),
      accountStatus: z.enum(["Active", "Suspend", "Ban"]).optional(),
    })
    .superRefine((data, ctx) => {
      const pairs: Array<{
        range: keyof typeof data;
        total: keyof typeof data;
        label: string;
      }> = [
        { range: "rangeSong", total: "totalSong", label: "Total Songs" },
        { range: "rangeAlbum", total: "totalAlbum", label: "Total Albums" },
        {
          range: "rangeFollowers",
          total: "totalFollowers",
          label: "Total Followers",
        },
        {
          range: "rangeStreams",
          total: "totalStreams",
          label: "Total Streams",
        },
      ];

      for (const { range, total, label } of pairs) {
        const rangeValue = data[range];
        const totalValue = data[total];

        if (
          rangeValue !== "None" &&
          (totalValue === undefined || totalValue === null)
        ) {
          ctx.addIssue({
            code: "custom",
            message: `${label} is required when range is selected`,
            path: [total],
          });
        }
      }
    });

  static readonly filterReqArtist = z.object({
    genre: z.enum([...baseGenreArtistValue, "None"]).default("None"),
    status: z.enum([...baseStatusReqArtistValue, "None"]).default("None"),
    rangeDateReq: z
      .object({
        from: z.date({ error: "Please fill properly" }).optional(),
        to: z.date({ error: "Please fill properly" }).optional(),
      })
      .refine((data) => !data.from || data.from <= new Date(), {
        message: "Start date cannot be in the future",
        path: ["from"],
      })
      .refine((data) => !data.to || data.to <= new Date(), {
        message: "End date cannot be in the future",
        path: ["to"],
      })
      .refine((data) => !data.from || !data.to || data.to >= data.from, {
        message: "End date cannot be before start date",
        path: ["to"],
      })
      .optional(),
  });
}
