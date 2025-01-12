import IconAt from "./icons/IconAt";
import IconSchool from "./icons/IconSchool";

export default function PortfolioMyself() {
	return (
		<div>
			<div className="mb-3 inline-block">
				<p className="text-2xl font-bold text-bricn-500">김동학</p>
				<p className="text-base text-bricn-300">Backend Engineer</p>
			</div>
			<ul className="text-base grid gap-y-1">
				<li className="flex gap-x-8 items-center">
					<IconAt size={18} className="text-bricn-300" />
					<p className="text-bricn-400">me@bricn.net</p>
				</li>
				<li className="flex gap-x-8">
					<IconSchool size={18} className="text-bricn-300" />
					<div>
						<p className="text-bricn-400">광주소프트웨어마이스터고등학교</p>
						<p className="text-bricn-400">스마트IoT과 재학</p>
					</div>
				</li>
			</ul>
		</div>
	);
}
