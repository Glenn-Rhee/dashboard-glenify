import z from "zod";
import { ItemsOverlay } from "./types";
import { schemaTableSong } from "../table/columns-song";
import { useState } from "react";
import { Ban, Clock3Icon, InfoIcon } from "lucide-react";

interface Props {
  item: z.infer<typeof schemaTableSong>;
  menu: ItemsOverlay;
}

export default function SongItems(props: Props) {
  const { item, menu } = props;
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  return (
    <>
      <menu.Item
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenDetail(true);
        }}
      >
        <InfoIcon className="size-5" /> View Detail
      </menu.Item>
      {item.statusSong === "Suspend" ? (
        <menu.Item disabled className="text-primary">
          <Clock3Icon className="size-5" /> Suspended
        </menu.Item>
      ) : item.statusSong === "Banned" ? (
        <menu.Item disabled className="text-destructive" variant="destructive">
          <Ban className="size-5" /> Banned
        </menu.Item>
      ) : (
        <>
          <menu.Item>
            <Clock3Icon className="size-5" /> Suspend
          </menu.Item>
          <menu.Item variant="destructive">
            <Ban className="size-5" /> Ban
          </menu.Item>
        </>
      )}
    </>
  );
}
