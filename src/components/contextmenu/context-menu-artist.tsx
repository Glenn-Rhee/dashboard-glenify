import ArtistItems from "../items/artist-items";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMap } from "./context-map";

interface Props {
  children: React.ReactNode;
  idArtist: string;
}

export default function ContextMenuArtist(props: Props) {
  const { children, idArtist } = props;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 px-2 py-1.5 rounded-sm! space-y-2">
        <ArtistItems menu={ContextMap} idArtist={idArtist} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
