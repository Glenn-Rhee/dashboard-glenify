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
      <div>
        <ChartAreaInteractive />
      </div>
      <div>
        <TableRequestArtist
          data={data as z.infer<typeof schemaTableReqArtist>[]}
        />
      </div>
    </Container>
  );
}
