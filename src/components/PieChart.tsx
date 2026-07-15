"use client";
import { Pie, PieChart as PieChartUI, LabelList } from "recharts";
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

// Palet warna tetap (siklus/rotasi kalau genre lebih banyak dari 5)
const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

// Fungsi untuk generate "key" yang aman dipakai sebagai property object
// (menghilangkan spasi/simbol, misal "Hip-Hop" -> "hiphop", "R&B" -> "rb")
function toSlugKey(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

interface Props {
  rawData: {
    genre: string;
    songs: number;
  }[];
}

export default function PieChart(props: Props) {
  const { rawData } = props;
  // Generate chartData dengan key yang sudah di-slug + warna otomatis
  const chartData = rawData.map((item, index) => ({
    genreKey: toSlugKey(item.genre),
    genre: item.genre,
    songs: item.songs,
    fill: CHART_COLORS[index % CHART_COLORS.length], // rotasi warna kalau genre > 5
  }));

  // Generate chartConfig otomatis dari chartData
  const chartConfig = {
    songs: { label: "Songs" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.genreKey,
        { label: item.genre, color: item.fill },
      ]),
    ),
  } satisfies ChartConfig;
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
            <Pie data={chartData} dataKey="songs" nameKey="genreKey">
              <LabelList
                dataKey="genreKey"
                className="fill-background"
                stroke="none"
                fontSize={13}
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
        <div className="flex items-center gap-2 leading-none font-medium">
          Top 5 genres make up 78% of total songs
        </div>
        <div className="leading-none text-muted-foreground">
          Showing genre distribution across the entire song catalog
        </div>
      </CardFooter>
    </>
  );
}
