"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pathRegister } from "@/utils/headerPath";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const path = pathRegister.get(pathname);
  console.log(pathRegister.keys().toArray());
  if (!path) return null;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="w-full flex justify-between px-4 lg:gap-2 lg:px-6">
        <div className="flex w-full items-center gap-1 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          {path.title}
        </div>

        {path.action}
      </div>
    </header>
  );
}
