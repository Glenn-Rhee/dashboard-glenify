import z from "zod";
import { schemaTableReqArtist } from "../table/columns-request-artist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ArtistRequesttItems from "../items/artist-requst-items";
import { DropdownMap } from "./dropdown-map";

interface Props {
  children: React.ReactNode;
  item: z.infer<typeof schemaTableReqArtist>;
}
export default function DropdownmenuRequestArtist(props: Props) {
  const { children, item } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit flex flex-col gap-y-2"
        align="end"
        onContextMenu={(e) => e.stopPropagation()}
      >
        <ArtistRequesttItems menu={DropdownMap} item={item} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
