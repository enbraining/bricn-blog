export default function H4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4 className={`text-[1em] font-semibold text-bricn-500 ${className}`}>
      {children}
    </h4>
  );
}
