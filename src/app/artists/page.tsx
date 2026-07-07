import Container from "@/components/Container";
import TableArtist from "@/components/pages/artist/TableArtist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "./data.json";
import ArtistVisualization from "@/components/pages/artist/ArtistVisualization";

export default function ArtistsPage() {
  return (
    <Container>
      <Tabs defaultValue="artist-statistics">
        <TabsList variant={"line"}>
          <TabsTrigger value="artist-list">Aritst List</TabsTrigger>
          <TabsTrigger value="artist-statistics">Aritst Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="artist-list">
          <TableArtist data={data} />
        </TabsContent>
        <TabsContent value="artist-statistics">
          <ArtistVisualization />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
