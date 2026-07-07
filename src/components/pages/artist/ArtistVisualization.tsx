import KPICard, { CardKPI } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import LineChart from "@/components/visualization/LineChart";

const chartData = [
  { date: "2024-04-01", value: 12 },
  { date: "2024-04-02", value: 8 },
  { date: "2024-04-03", value: 15 },
  { date: "2024-04-04", value: 22 },
  { date: "2024-04-05", value: 18 },
  { date: "2024-04-06", value: 25 },
  { date: "2024-04-07", value: 14 },
  { date: "2024-04-08", value: 30 },
  { date: "2024-04-09", value: 9 },
  { date: "2024-04-10", value: 17 },
  { date: "2024-04-11", value: 21 },
  { date: "2024-04-12", value: 19 },
  { date: "2024-04-13", value: 26 },
  { date: "2024-04-14", value: 11 },
  { date: "2024-04-15", value: 10 },
  { date: "2024-04-16", value: 13 },
  { date: "2024-04-17", value: 33 },
  { date: "2024-04-18", value: 28 },
  { date: "2024-04-19", value: 16 },
  { date: "2024-04-20", value: 7 },
  { date: "2024-04-21", value: 12 },
  { date: "2024-04-22", value: 20 },
  { date: "2024-04-23", value: 14 },
  { date: "2024-04-24", value: 29 },
  { date: "2024-04-25", value: 18 },
  { date: "2024-04-26", value: 6 },
  { date: "2024-04-27", value: 31 },
  { date: "2024-04-28", value: 10 },
  { date: "2024-04-29", value: 24 },
  { date: "2024-04-30", value: 34 },
  { date: "2024-05-01", value: 13 },
  { date: "2024-05-02", value: 23 },
  { date: "2024-05-03", value: 19 },
  { date: "2024-05-04", value: 30 },
  { date: "2024-05-05", value: 36 },
  { date: "2024-05-06", value: 38 },
  { date: "2024-05-07", value: 29 },
  { date: "2024-05-08", value: 11 },
  { date: "2024-05-09", value: 17 },
  { date: "2024-05-10", value: 22 },
  { date: "2024-05-11", value: 25 },
  { date: "2024-05-12", value: 15 },
  { date: "2024-05-13", value: 15 },
  { date: "2024-05-14", value: 35 },
  { date: "2024-05-15", value: 37 },
  { date: "2024-05-16", value: 26 },
  { date: "2024-05-17", value: 39 },
  { date: "2024-05-18", value: 24 },
  { date: "2024-05-19", value: 18 },
  { date: "2024-05-20", value: 13 },
  { date: "2024-05-21", value: 6 },
  { date: "2024-05-22", value: 6 },
  { date: "2024-05-23", value: 19 },
  { date: "2024-05-24", value: 22 },
  { date: "2024-05-25", value: 15 },
  { date: "2024-05-26", value: 16 },
  { date: "2024-05-27", value: 32 },
  { date: "2024-05-28", value: 18 },
  { date: "2024-05-29", value: 6 },
  { date: "2024-05-30", value: 26 },
  { date: "2024-05-31", value: 14 },
  { date: "2024-06-01", value: 14 },
  { date: "2024-06-02", value: 36 },
  { date: "2024-06-03", value: 8 },
  { date: "2024-06-04", value: 33 },
  { date: "2024-06-05", value: 7 },
  { date: "2024-06-06", value: 22 },
  { date: "2024-06-07", value: 25 },
  { date: "2024-06-08", value: 29 },
  { date: "2024-06-09", value: 34 },
  { date: "2024-06-10", value: 12 },
  { date: "2024-06-11", value: 7 },
  { date: "2024-06-12", value: 38 },
  { date: "2024-06-13", value: 6 },
  { date: "2024-06-14", value: 33 },
  { date: "2024-06-15", value: 24 },
  { date: "2024-06-16", value: 29 },
  { date: "2024-06-17", value: 37 },
  { date: "2024-06-18", value: 8 },
  { date: "2024-06-19", value: 27 },
  { date: "2024-06-20", value: 32 },
  { date: "2024-06-21", value: 13 },
  { date: "2024-06-22", value: 25 },
  { date: "2024-06-23", value: 38 },
  { date: "2024-06-24", value: 10 },
  { date: "2024-06-25", value: 11 },
  { date: "2024-06-26", value: 34 },
  { date: "2024-06-27", value: 35 },
  { date: "2024-06-28", value: 12 },
  { date: "2024-06-29", value: 8 },
  { date: "2024-06-30", value: 35 },
];

const chartConfig = {
  value: {
    label: "New Artists",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const dataCard: CardKPI[] = [
  {
    title: "Total Artist",
    value: 1200,
    convertTo: "number",
  },
  {
    title: "Verified Artist",
    value: 800,
    convertTo: "number",
  },
  {
    title: "Avg Streams",
    value: 45678,
    convertTo: "number",
  },
  {
    title: "New This Month",
    value: 450,
    convertTo: "number",
  },
];

export default function ArtistVisualization() {
  return (
    <div className="mt-3">
      <KPICard cards={dataCard} />
      <Card className="@container/card mt-6">
        <LineChart
          title="Artist Growth"
          description="New artists joined in the last"
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </Card>
    </div>
  );
}
