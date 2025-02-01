export default function H5({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h5 className={`text-[0.875em] font-semibold text-bricn-500 ${className}`}>
      {children}
    </h5>
  );
}
