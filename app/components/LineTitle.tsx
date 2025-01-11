
export default function LineTitle({
	content,
	date,
}: { content: string; date: string }) {
	return (
		<div
			className="hover:border-bricn-200 border-bricn-100 gap-x-2 text-base flex items-center text-bricn-500 border rounded-lg py-4 px-5"
		>
			<h1 className="text-lg font-medium">
				{content}
			</h1>
			<p>{date}</p>
		</div>
	);
}
