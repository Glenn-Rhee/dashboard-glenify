import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";

interface ValueRegister {
  title: string;
  action: null | JSX.Element;
}
export const pathRegister: Map<string, ValueRegister> = new Map([
  [
    "/",
    {
      title: "Dashboard",
      action: null,
    },
  ],
  [
    "/artists",
    {
      title: "Moderation Artists",
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
      title: "Request Artist",
      action: null,
    },
  ],
  [
    "/songs",
    {
      title: "Moderation Songs",
      action: null,
    },
  ],
  [
    "/albums",
    {
      title: "Moderation Albums",
      action: null,
    },
  ],
  [
    "/statistics",
    {
      title: "Statistics",
      action: null,
    },
  ],
  [
    "/playlists",
    {
      title: "Playlists",
      action: null,
    },
  ],
  [
    "/users",
    {
      title: "Users",
      action: null,
    },
  ],
  [
    "/transactions",
    {
      title: "Transactions",
      action: null,
    },
  ],
]);
