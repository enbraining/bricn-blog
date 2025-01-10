
export default function LineTitle({
	content,
	date,
}: { content: string; date: string }) {
	return (
		<div
			className="group gap-x-2 text-base flex items-center text-secondary border border-line rounded-lg py-4 px-5"
		>
			<h1 className="text-lg font-medium group-hover:underline decoration-neutral-400 underline-offset-4">
				{content}
			</h1>
			<p>{date}</p>
		</div>
	);
}
