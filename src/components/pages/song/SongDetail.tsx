"use client";
import { useState } from "react";
import { schemaTableSong } from "@/components/table/columns-song";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Ban, Clock3Icon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import z from "zod";

const chartConfig = {
  totalStreams: {
    label: "Total Streams",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// TODO: ganti dengan data streams per-song dari API (misal: item.streamsHistory)
const streamsData = [
  { month: "January", totalStreams: 12400 },
  { month: "February", totalStreams: 19800 },
  { month: "March", totalStreams: 15300 },
  { month: "April", totalStreams: 22100 },
  { month: "May", totalStreams: 18700 },
  { month: "June", totalStreams: 25600 },
];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SongDetail({
  item,
  open,
  onOpenChange,
}: {
  item: z.infer<typeof schemaTableSong>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [showLyric, setShowLyric] = useState(false);

  const isSuspended = item.statusSong === "Suspend";
  const isBanned = item.statusSong === "Banned";
  const isRestricted = isSuspended || isBanned;

  // Asumsi field opsional; tambahkan `statusReason` di schemaTableSong jika belum ada
  const statusReason =
    (item as z.infer<typeof schemaTableSong> & { statusReason?: string })
      .statusReason ?? "No reason provided.";

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <h2 className="font-semibold text-lg mb-3">
            Streams Detail for the last 6 months
          </h2>
          <div className="flex items-center gap-3">
            <Image
              width={80}
              height={80}
              src={"/dummy-prof.jpg"}
              alt={item.songTitle}
              className="h-14 w-14 rounded-md object-cover"
            />
            <div>
              <DrawerTitle>{item.songTitle}</DrawerTitle>
              <DrawerDescription>
                by {item.artistName} ·{" "}
                {new Date(item.uploadedDate).toLocaleDateString("id-ID")}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={streamsData}
                  margin={{ left: 0, right: 10 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="totalStreams"
                    type="natural"
                    fill="var(--color-totalStreams)"
                    fillOpacity={0.4}
                    stroke="var(--color-totalStreams)"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-semibold">
                    {formatDuration(item.duration)}
                  </div>
                  <div className="text-muted-foreground text-xs">Duration</div>
                </div>
                <div>
                  <div className="text-lg font-semibold truncate">
                    {item.genre}
                  </div>
                  <div className="text-muted-foreground text-xs">Genre</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {item.totalStreams.toLocaleString("id-ID")}
                  </div>
                  <div className="text-muted-foreground text-xs">Streams</div>
                </div>
              </div>
              <Separator />
            </>
          )}

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="songTitle">Song Title</Label>
              <Input id="songTitle" defaultValue={item.songTitle} readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="artistName">Artist</Label>
                <Input
                  id="artistName"
                  defaultValue={item.artistName}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="albumName">Album</Label>
                <Input
                  id="albumName"
                  defaultValue={item.albumName || "Single"}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="genre">Genre</Label>
                <Input id="genre" defaultValue={item.genre} readOnly />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  defaultValue={formatDuration(item.duration)}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="lyric">Lyric</Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => setShowLyric((prev) => !prev)}
                >
                  {showLyric ? "Hide" : "Show"}
                </Button>
              </div>
              {showLyric && (
                <Textarea
                  id="lyric"
                  defaultValue={item.lyric || "No lyric available."}
                  readOnly
                  rows={6}
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Audio Preview</Label>
              <audio
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                src={item.audioUrl}
                className="w-full h-10"
              >
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <div>
                <Badge
                  variant={
                    item.statusSong === "Active"
                      ? "default"
                      : item.statusSong === "Banned"
                        ? "destructive"
                        : "outline"
                  }
                  className={cn(
                    item.statusSong === "Suspend"
                      ? "border-destructive text-destructive font-semibold"
                      : "",
                  )}
                >
                  {item.statusSong}
                </Badge>
              </div>
            </div>

            {isRestricted && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="statusReason">
                  {isBanned ? "Ban Reason" : "Suspend Reason"}
                </Label>
                <Textarea
                  id="statusReason"
                  defaultValue={statusReason}
                  readOnly
                  rows={3}
                />
              </div>
            )}
          </form>
        </div>

        <DrawerFooter>
          <div className="flex gap-2">
            {!isBanned && (
              <Button
                variant="outline"
                className="flex-1"
                disabled={isSuspended}
              >
                <Clock3Icon className="h-4 w-4" />
                {isSuspended ? "Suspended" : "Suspend"}
              </Button>
            )}
            {!isSuspended && (
              <Button
                variant="destructive"
                className="flex-1"
                disabled={isBanned}
              >
                <Ban className="h-4 w-4" />
                {isBanned ? "Banned" : "Ban"}
              </Button>
            )}
          </div>
          <DrawerClose asChild>
            <Button variant="default">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
