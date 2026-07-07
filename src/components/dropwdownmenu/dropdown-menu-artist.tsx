import z from "zod";
import ArtistItems from "../items/artist-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMap } from "./dropdown-map";
import { schemaTableArtist } from "../table/columns-artist";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableArtist>;
}
export default function DropdownmenuArtist(props: Props) {
  const { children, item } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 flex flex-col gap-y-2"
        align="end"
        onContextMenu={(e) => e.stopPropagation()}
      >
        <ArtistItems menu={DropdownMap} item={item} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
