"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="mt-6">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="gap-y-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-200",
                {
                  "bg-primary text-white": pathname === item.url,
                },
              )}
            >
              <SidebarMenuItem
                className="flex items-center gap-x-3 px-2 text-sm"
                key={item.title}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
