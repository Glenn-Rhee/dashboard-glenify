"use client";
import { Ban, Clock3Icon, InfoIcon } from "lucide-react";
import { ItemsOverlay } from "./types";
import { ArtistDetail } from "../pages/artist/ArtistDetail";
import z from "zod";
import { schemaTableArtist } from "../table/columns-artist";
import { useState } from "react";

interface Props {
  item: z.infer<typeof schemaTableArtist>;
  menu: ItemsOverlay;
}

export default function ArtistItems(props: Props) {
  const { item, menu } = props;
  console.log(item);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  return (
    <>
      <ArtistDetail
        item={item}
        onOpenChange={setOpenDetail}
        open={openDetail}
      />
      <menu.Item
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenDetail(true);
        }}
      >
        <InfoIcon className="size-5" /> View Detail
      </menu.Item>
      <menu.Item>
        <Clock3Icon className="size-5" /> Suspend
      </menu.Item>
      <menu.Item variant="destructive">
        <Ban className="size-5" /> Ban
      </menu.Item>
    </>
  );
}
