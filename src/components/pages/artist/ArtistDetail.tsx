import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { Ban, Clock3Icon } from "lucide-react";
import z from "zod";
import { schemaTableArtist } from "@/components/table/columns-artist";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const chartConfig = {
  totalStreams: {
    label: "Total Streams",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const streamsData = [
  { month: "January", totalStreams: 18600 },
  { month: "February", totalStreams: 30500 },
  { month: "March", totalStreams: 23700 },
  { month: "April", totalStreams: 7300 },
  { month: "May", totalStreams: 20900 },
  { month: "June", totalStreams: 21400 },
];

export function ArtistDetail({
  item,
  open,
  onOpenChange,
}: {
  item: z.infer<typeof schemaTableArtist>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <h2 className="font-semibold text-lg mb-3">
            Streams Detail for the last 30 days
          </h2>
          <div className="flex items-center gap-3">
            <Image
              width={80}
              height={80}
              src={item.avatarUrl}
              alt={item.artistName}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <DrawerTitle>{item.artistName}</DrawerTitle>
              <DrawerDescription>
                Joined {new Date(item.createdAt).toLocaleDateString("id-ID")}
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
                  <div className="text-lg font-semibold">128</div>
                  <div className="text-muted-foreground text-xs">Songs</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">12</div>
                  <div className="text-muted-foreground text-xs">Albums</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">45.2K</div>
                  <div className="text-muted-foreground text-xs">Followers</div>
                </div>
              </div>
              <Separator />
            </>
          )}

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="artistName">Artist Name</Label>
              <Input id="artistName" defaultValue={item.artistName} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={item.bio} readOnly />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label>Verification Status</Label>
                <Badge variant={item.verified ? "default" : "outline"}>
                  {item.verified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Account Status</Label>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </form>
        </div>

        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Clock3Icon className="h-4 w-4" />
              Suspend
            </Button>
            <Button variant="destructive" className="flex-1">
              <Ban className="h-4 w-4" />
              Ban
            </Button>
          </div>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
