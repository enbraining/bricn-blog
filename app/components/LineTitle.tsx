export default function LineTitle({
	content,
	date,
}: { content: string; date: string }) {
	return (
		<div className="gap-x-2 text-base flex items-center text-subtitle border border-line rounded-lg py-4 px-5">
			<h1 className="text-lg font-medium">{content}</h1>
			<p>{date}</p>
		</div>
	);
}
