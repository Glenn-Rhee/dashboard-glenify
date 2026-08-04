import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  backTo: string;
}

export default function PageHeader(props: Props) {
  const { backTo } = props;
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        onClick={() => router.push(backTo)}
        className="hover:bg-gray-800/10 transition-colors duration-100 rounded-full flex items-center justify-center size-8 mr-2 cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </button>
      <h1 className="text-base font-medium">Request Artist</h1>
    </div>
  );
}
