import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardKPI {
  title: string;
  value: number;
  convertTo: "number" | "currency" | "percent";
}

interface Props {
  cards: CardKPI[];
}

export default function KPICard(props: Props) {
  const { cards } = props;
  const getUnit = (type: CardKPI["convertTo"]) => {
    return type === "currency" ? "$" : type === "percent" ? "%" : "";
  };

  const getFormatNumeric = (value: number, type: CardKPI["convertTo"]) => {
    if (type === "percent") {
      const result = value * 100;
      return result.toLocaleString("id-ID");
    }

    return value.toLocaleString("id-Id");
  };
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 dark:*:data-[slot=card]:bg-card",
        cards.length > 4
          ? "@5xl/main:grid-cols-4"
          : `@5xl/main:grid-cols-${cards.length}`,
      )}
    >
      {cards.map((card) => (
        <Card key={card.title} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {getUnit(card.convertTo) +
                getFormatNumeric(card.value, card.convertTo)}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
