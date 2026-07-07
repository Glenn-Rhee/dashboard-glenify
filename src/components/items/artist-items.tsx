import { Ban, Clock3Icon, InfoIcon } from "lucide-react";
import { ItemsOverlay } from "./types";

interface Props {
  idArtist: string;
  menu: ItemsOverlay;
}

export default function ArtistItems(props: Props) {
  const { idArtist, menu } = props;
  console.log(idArtist);
  return (
    <>
      <menu.Item>
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
