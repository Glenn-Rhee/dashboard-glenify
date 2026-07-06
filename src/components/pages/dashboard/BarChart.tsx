"use client";
import { Bar, BarChart as BarChartUI, LabelList, XAxis, YAxis } from "recharts";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { YAxisTick } from "./YAxisTick";

export const description = "A horizontal bar chart";

const chartData = [
  {
    name: "Taylor Swift",
    totalStreams: 305,
    avatar: "/dummy-prof.jpg",
  },
  {
    name: "Ariana Grande",
    totalStreams: 237,
    avatar: "/dummy-prof.jpg",
  },
  { name: "The Weeknd", totalStreams: 214, avatar: "/dummy-prof.jpg" },
  {
    name: "Billie Eilish",
    totalStreams: 209,
    avatar: "/dummy-prof.jpg",
  },
  { name: "Drake", totalStreams: 186, avatar: "/dummy-prof.jpg" },
];

const chartConfig = {
  totalStreams: {
    label: "Total Streams",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function BarChart() {
  return (
    <>
      <CardHeader>
        <CardTitle>Top 5 Artists by Streams</CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChartUI
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="totalStreams" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
              tick={({ x, y, payload }) => (
                <YAxisTick
                  chartData={chartData}
                  payload={payload}
                  x={x}
                  y={y}
                />
              )}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="totalStreams"
              fill="var(--color-totalStreams)"
              radius={5}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-white text-xs font-medium"
              />
            </Bar>
          </BarChartUI>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Taylor Swift leads with the highest total streams
          </div>
          <div className="leading-none text-muted-foreground">
            Showing top 5 artists ranked by all-time streams
          </div>
        </CardFooter>
      </CardFooter>
    </>
  );
}
