"use client";
import { LabelList, Pie, PieChart as PieChartUI } from "recharts";

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

const chartData = [
  { genre: "pop", songs: 342, fill: "var(--color-pop)" },
  { genre: "hiphop", songs: 268, fill: "var(--color-hiphop)" },
  { genre: "rnb", songs: 195, fill: "var(--color-rnb)" },
  { genre: "rock", songs: 147, fill: "var(--color-rock)" },
  { genre: "other", songs: 98, fill: "var(--color-other)" },
];

const chartConfig = {
  songs: {
    label: "Songs",
  },
  pop: {
    label: "Pop",
    color: "var(--chart-1)",
  },
  hiphop: {
    label: "Hip-Hop",
    color: "var(--chart-2)",
  },
  rnb: {
    label: "R&B",
    color: "var(--chart-3)",
  },
  rock: {
    label: "Rock",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function PieChart() {
  return (
    <>
      <CardHeader className="items-center pb-0">
        <CardTitle>Genre Distribution</CardTitle>
        <CardDescription>All time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-100 [&_.recharts-text]:fill-background"
        >
          <PieChartUI>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="songs" hideLabel />}
            />
            <Pie data={chartData} dataKey="songs">
              <LabelList
                dataKey="genre"
                className="fill-background"
                stroke="none"
                fontSize={18}
                fontWeight={700}
                formatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
            </Pie>
          </PieChartUI>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Top 5 genres make up 78% of total songs
          </div>
          <div className="leading-none text-muted-foreground">
            Showing genre distribution across the entire song catalog
          </div>
        </CardFooter>
      </CardFooter>
    </>
  );
}
