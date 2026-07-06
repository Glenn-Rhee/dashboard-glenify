interface ContainerProps {
  children: React.ReactNode;
}
export default function Container(props: ContainerProps) {
  const { children } = props;
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
