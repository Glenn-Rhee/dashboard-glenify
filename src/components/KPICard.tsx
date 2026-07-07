import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface CardKPI {
  title: string;
  value: number;
  convertTo: "number" | "currency";
}

interface Props {
  cards: CardKPI[];
}

export default function KPICard(props: Props) {
  const { cards } = props;
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => (
        <Card key={card.title} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {(card.convertTo === "number" ? "" : "$") +
                card.value.toLocaleString("id-ID")}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
