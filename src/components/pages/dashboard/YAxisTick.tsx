import Image from "next/image";
import { CartesianTickItem } from "recharts";

interface Props {
  x: string | number;
  y: string | number;
  payload: CartesianTickItem;
  chartData: {
    name: string;
    totalStreams: number;
    avatar: string;
  }[];
}

export const YAxisTick = (props: Props) => {
  const { x, y, payload, chartData } = props;
  const artist = chartData.find((item) => item.name === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-40} y={-14} width={28} height={28}>
        <Image
          src={artist?.avatar || "/dummy-prof.jpg"}
          alt={payload.value}
          width={60}
          height={60}
          className="rounded-full object-cover shrink-0"
        />
      </foreignObject>
    </g>
  );
};
