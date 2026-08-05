"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function HeaderAction() {
  return (
    <div className="flex w-full md:w-fit items-center gap-x-3">
      <div className="relative flex items-center w-full">
        <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search artist..."
          className="pl-8 w-full md:w-64"
        />
      </div>
    </div>
  );
}
