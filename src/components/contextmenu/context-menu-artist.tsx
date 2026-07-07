import z from "zod";
import ArtistItems from "../items/artist-items";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMap } from "./context-map";
import { schemaTableArtist } from "../table/columns-artist";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableArtist>;
}

export default function ContextMenuArtist(props: Props) {
  const { children, item } = props;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 px-2 py-1.5 rounded-sm! space-y-2">
        <ArtistItems menu={ContextMap} item={item} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
