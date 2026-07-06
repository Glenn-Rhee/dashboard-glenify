import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json";
import { TableRequestArtist } from "@/components/TableRequestArtist";
import z from "zod";
import { schemaTableReqArtist } from "@/components/table/columns-request-artist";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6">
        <TableRequestArtist
          data={data as z.infer<typeof schemaTableReqArtist>[]}
        />
      </div>
    </Container>
  );
}
