import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json";
import { TableRequestArtist } from "@/components/TableRequestArtist";
import z from "zod";
import { schemaTableReqArtist } from "@/components/table/columns-request-artist";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-4 lg:px-6">
            <TableRequestArtist data={data as z.infer<typeof schemaTableReqArtist>[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
