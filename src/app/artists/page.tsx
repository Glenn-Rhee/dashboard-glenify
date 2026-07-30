import Container from "@/components/Container";
import TableArtist from "@/components/pages/artist/TableArtist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "./data.json";
import ArtistVisualization from "@/components/pages/artist/ArtistVisualization";
import { schemaTableArtist } from "@/components/table/columns-artist";
import z from "zod";

export default function ArtistsPage() {
  return (
    <Container>
      <Tabs defaultValue="artist-list">
        <TabsList variant={"line"}>
          <TabsTrigger value="artist-list">Aritst List</TabsTrigger>
          <TabsTrigger value="artist-statistics">Aritst Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="artist-list">
          <TableArtist data={data as z.infer<typeof schemaTableArtist>[]} />
        </TabsContent>
        <TabsContent value="artist-statistics">
          <ArtistVisualization />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
