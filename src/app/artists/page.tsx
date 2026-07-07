import Container from "@/components/Container";
import TableAritist from "@/components/pages/artist/TableAritist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "./data.json"

export default function ArtistsPage() {
  return (
    <Container>
      <Tabs defaultValue="artist-list">
        <TabsList variant={"line"}>
          <TabsTrigger value="artist-list">Aritst List</TabsTrigger>
          <TabsTrigger value="artist-statistics">Aritst Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="artist-list">
          <TableAritist data={data}/>
        </TabsContent>
        <TabsContent value="artist-statistics">cihuy 2</TabsContent>
      </Tabs>
    </Container>
  );
}
