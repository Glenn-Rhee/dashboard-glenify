import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import data from "./data.json";
import { TableRequestArtist } from "@/components/TableRequestArtist";
import z from "zod";
import { schemaTableReqArtist } from "@/components/table/columns-request-artist";
import Container from "@/components/Container";
import KPICard, { CardKPI } from "@/components/KPICard";

const dataCard: CardKPI[] = [
  {
    title: "Total Revenue",
    value: 1250,
    convertTo: "currency",
  },
  {
    title: "Premium Active Users",
    value: 1234,
    convertTo: "number",
  },
  {
    title: "Total Streams",
    value: 45678,
    convertTo: "number",
  },
  {
    title: "Artist Active",
    value: 450,
    convertTo: "number",
  },
];

export default function Home() {
  return (
    <Container>
      <KPICard cards={dataCard} />
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
