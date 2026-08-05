import Container from "@/components/Container";
import KPICard, { CardKPI } from "@/components/KPICard";
import { TableRequestArtist } from "@/components/TableRequestArtist";
import data from "@/app/data.json";
import z from "zod";
import { schemaTableReqArtist } from "@/components/table/columns-request-artist";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        <KPICard className="@5xl/main:grid-cols-3" cards={dataCard} />
      </div>
      <TableRequestArtist
        withPagination
        headerAction={
          <div className="flex w-full md:w-fit items-center gap-x-3">
            <div className="relative flex items-center w-full">
              <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search artist..."
                className="pl-8 w-full md:w-64"
              />
            </div>
          </div>
        }
        data={data as z.infer<typeof schemaTableReqArtist>[]}
      />
    </Container>
  );
}
