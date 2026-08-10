import z from "zod";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMap } from "./context-map";
import SongItems from "../items/song-items";
import { schemaTableSong } from "../table/columns-song";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableSong>;
}

export default function ContextmenuSong(props: Props) {
  const { children, item } = props;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 px-2 py-1.5 rounded-sm! space-y-2">
        <SongItems menu={ContextMap} item={item} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
