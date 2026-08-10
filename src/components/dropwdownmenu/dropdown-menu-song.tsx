import z from "zod";
import { schemaTableSong } from "../table/columns-song";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMap } from "./dropdown-map";
import SongItems from "../items/song-items";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableSong>;
}
export default function DropdownMenuSong(props: Props) {
  const { children, item } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 flex flex-col gap-y-2"
        align="end"
        onContextMenu={(e) => e.stopPropagation()}
      >
        <SongItems menu={DropdownMap} item={item} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
