"use client";

import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Settings2Icon,
  DatabaseIcon,
  FileChartColumnIcon,
  CommandIcon,
  User,
  Music4,
  DiscAlbum,
  ChartColumnBig,
  ListMusicIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon className="size-5" />,
    },
    {
      title: "Moderation Artists",
      url: "/artists",
      icon: <User className="size-5" />,
    },
    {
      title: "Moderation Songs",
      url: "/songs",
      icon: <Music4 className="size-5" />,
    },
    {
      title: "Moderation Albums",
      url: "/albums",
      icon: <DiscAlbum className="size-5" />,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: <ChartColumnBig className="size-5" />,
    },
    {
      title: "Playlists",
      url: "/playlists",
      icon: <ListMusicIcon className="size-5" />,
    },
    {
      title: "Users",
      url: "/users",
      icon: <UsersIcon className="size-5" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon className="size-5" />,
    },
  ],
  documents: [
    {
      name: "Data Applications",
      url: "#",
      icon: <DatabaseIcon className="size-5" />,
    },
    {
      name: "Report Statistics",
      url: "#",
      icon: <FileChartColumnIcon className="size-5" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">
                  Glenify Dashboard
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
