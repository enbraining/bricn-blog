export default function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-[1.25em] font-semibold text-bricn-200 ${className}`}>
      {children}
    </h3>
  );
}
