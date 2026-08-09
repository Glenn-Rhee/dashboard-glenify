import Container from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SongsPage() {
  return (
    <Container>
      <Tabs defaultValue="song-list">
        <TabsList variant={"line"}>
          <TabsTrigger value="song-list">Songs List</TabsTrigger>
          <TabsTrigger value="song-statistics">Song Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="song-list">cihuy</TabsContent>
        <TabsContent value="song-statistics">cihuy 2</TabsContent>
      </Tabs>
    </Container>
  );
}
