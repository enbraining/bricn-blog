export default function LineTitle({
  content,
  date,
}: {
  content: string;
  date: string;
}) {
  return (
    <div className="bg-neutral-200 gap-x-2 text-base flex items-center border rounded-lg py-4 px-5">
      <h1 className="text-lg font-medium">{content}</h1>
      <p>{date}</p>
    </div>
  );
}
