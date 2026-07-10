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
import { YAxisTick } from "./pages/dashboard/YAxisTick";

const chartConfig = {
  totalStreams: {
    label: "Total Streams",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  chartData: {
    name: string;
    totalStreams: number;
    avatar: string;
  }[];
}

export default function BarchartArtist(props: Props) {
  const { chartData } = props;
  return (
    <>
      <CardHeader>
        <CardTitle>Top {chartData.length} Artists by Streams</CardTitle>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
