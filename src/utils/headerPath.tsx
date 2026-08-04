import PageHeader from "@/components/PageHeader";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";

interface ValueRegister {
  title: JSX.Element;
  action: null | JSX.Element;
}
export const pathRegister: Map<string, ValueRegister> = new Map([
  [
    "/",
    {
      title: <h1 className="text-base font-medium">Dashboard</h1>,
      action: null,
    },
  ],
  [
    "/artists",
    {
      title: <h1 className="text-base font-medium">Moderation Artists</h1>,
      action: (
        <Link href={"/artists/request"} className="cursor-pointer">
          <UserRoundPlus className="size-5" />
        </Link>
      ),
    },
  ],
  [
    "/artists/request",
    {
      title: <PageHeader backTo="/artists" />,
      action: null,
    },
  ],
  [
    "/songs",
    {
      title: <h1 className="text-base font-medium">Moderation Songs</h1>,
      action: null,
    },
  ],
  [
    "/albums",
    {
      title: <h1 className="text-base font-medium">Moderation Albums</h1>,
      action: null,
    },
  ],
  [
    "/statistics",
    {
      title: <h1 className="text-base font-medium">Statistics</h1>,
      action: null,
    },
  ],
  [
    "/playlists",
    {
      title: <h1 className="text-base font-medium">Playlists</h1>,
      action: null,
    },
  ],
  [
    "/users",
    {
      title: <h1 className="text-base font-medium">Users</h1>,
      action: null,
    },
  ],
  [
    "/transactions",
    {
      title: <h1 className="text-base font-medium">Transactions</h1>,
      action: null,
    },
  ],
]);
