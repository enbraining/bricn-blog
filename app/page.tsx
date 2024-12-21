import ExternalLink from "./components/ExternalLink";
import Myself from "./components/Myself";

export default function Home() {
	return (
		<div>
			<Myself />
			<div className="mt-3">
				<ExternalLink href={"/profile"}>자세히 보기</ExternalLink>
			</div>
		</div>
	);
}
