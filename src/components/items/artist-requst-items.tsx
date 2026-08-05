import z from "zod";
import { ItemsOverlay } from "./types";
import {
  ArtistRequestDetail,
  schemaTableReqArtist,
} from "../table/columns-request-artist";
import { Check, InfoIcon, X } from "lucide-react";
import { useState } from "react";

interface Props {
  item: z.infer<typeof schemaTableReqArtist>;
  menu: ItemsOverlay;
}

export default function ArtistRequesttItems(props: Props) {
  const { item, menu } = props;
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  return (
    <>
      {item.status === "Approved" ? (
        <menu.Item disabled className="text-primary">
          <Check className="size-5" /> Approved
        </menu.Item>
      ) : item.status === "Rejected" ? (
        <menu.Item disabled className="text-destructive" variant="destructive">
          <X className="size-5" /> Rejected
        </menu.Item>
      ) : (
        <>
          <menu.Item>
            <Check className="size-5" /> Approve
          </menu.Item>
          <menu.Item variant="destructive">
            <X className="size-5" /> Reject
          </menu.Item>
        </>
      )}
      <ArtistRequestDetail
        open={openDetail}
        onOpenChange={setOpenDetail}
        item={item}
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
    </>
  );
}
