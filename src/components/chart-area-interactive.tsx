import { Card } from "@/components/ui/card";
import LineChart from "./pages/dashboard/LineChart";
import PieChart from "./pages/dashboard/PieChart";
import BarChart from "./pages/dashboard/BarChart";

export const description = "An interactive area chart";

export function ChartAreaInteractive() {
  return (
    <>
      <Card className="@container/card">
        <LineChart />
      </Card>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
        <Card className="@container/card">
          <PieChart />
        </Card>
        <Card className="@container/card">
          <BarChart />
        </Card>
      </div>
    </>
  );
}
