import Container from "@/components/Container";
import KPICard, { CardKPI } from "@/components/KPICard";
import { TableRequestArtist } from "@/components/TableRequestArtist";
import data from "@/app/data.json";
import z from "zod";
import { schemaTableReqArtist } from "@/components/table/columns-request-artist";

const dataCard: CardKPI[] = [
  {
    title: "Total Requests",
    value: 156,
    convertTo: "number",
  },
  {
    title: "Pending",
    value: 12,
    convertTo: "number",
  },
  {
    title: "Approval Rate",
    value: 89 / 100,
    convertTo: "percent",
  },
];

export default function ArtistRequestPage() {
  return (
    <Container>
      <div className="mt-3">
        <KPICard cards={dataCard} />
      </div>
      <TableRequestArtist
        data={data as z.infer<typeof schemaTableReqArtist>[]}
      />
    </Container>
  );
}
