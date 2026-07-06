import Container from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ArtistsPage() {
  return (
    <Container>
      <Tabs defaultValue="artist-list">
        <TabsList variant={"line"}>
          <TabsTrigger value="artist-list">Aritst List</TabsTrigger>
          <TabsTrigger value="artist-statistics">Aritst Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="artist-list"></TabsContent>
        <TabsContent value="artist-statistics">cihuy 2</TabsContent>
      </Tabs>
    </Container>
  );
}
