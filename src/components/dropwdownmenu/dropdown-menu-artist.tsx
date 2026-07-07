import ArtistItems from "../items/artist-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMap } from "./dropdown-map";

interface Props {
  children: React.ReactNode;
  idArtist: string;
}
export default function DropdownmenuArtist(props: Props) {
  const { children, idArtist } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        align="end"
        onContextMenu={(e) => e.stopPropagation()}
      >
        <ArtistItems menu={DropdownMap} idArtist={idArtist} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
