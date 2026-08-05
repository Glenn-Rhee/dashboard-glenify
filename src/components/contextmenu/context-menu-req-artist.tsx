import z from "zod";
import { schemaTableReqArtist } from "../table/columns-request-artist";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import ArtistRequesttItems from "../items/artist-requst-items";
import { ContextMap } from "./context-map";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableReqArtist>;
}
export default function ContextMenuReqArtist(props: Props) {
  const { children, item } = props;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-fit px-2 py-1.5 rounded-sm! space-y-2">
        <ArtistRequesttItems menu={ContextMap} item={item} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
