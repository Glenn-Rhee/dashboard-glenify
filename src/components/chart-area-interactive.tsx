import { Card } from "@/components/ui/card";
import PieChart from "./pages/dashboard/PieChart";
import LineChart from "./visualization/LineChart";
import { ChartConfig } from "./ui/chart";
import BarchartArtist from "./BarchartArtist";

export const description = "An interactive area chart";

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

const barChartData = [
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

// Data mentah dari API/database (jumlah genre bisa berubah-ubah)
const pieChartData = [
  { genre: "Pop", songs: 342 },
  { genre: "Hip-Hop", songs: 268 },
  { genre: "R&B", songs: 195 },
  { genre: "Rock", songs: 147 },
  { genre: "Jazz", songs: 76 },
  { genre: "EDM", songs: 54 },
  { genre: "Other", songs: 98 },
];

export function ChartAreaInteractive() {
  return (
    <>
      <Card className="@container/card">
        <LineChart
          title="Total Revenue"
          description="Total Revenue for the last"
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </Card>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
        <Card className="@container/card">
          <PieChart rawData={pieChartData} />
        </Card>
        <Card className="@container/card">
          <BarchartArtist chartData={barChartData} />
        </Card>
      </div>
    </>
  );
}
