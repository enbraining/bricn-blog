import { IconAt, IconSchool } from "@tabler/icons-react";

export default function PortfolioMyself() {
	return (
		<div>
			<div className="mb-3 inline-block">
				<p className="text-2xl font-bold text-primary">김동학</p>
				<p className="text-base text-secondary">Backend Engineer</p>
			</div>
			<ul className="text-base grid gap-y-1">
				<li className="flex gap-x-8 items-center">
					<IconAt stroke={2} className="text-icon" />
					<p className="text-secondary">me@bricn.net</p>
				</li>
				<li className="flex gap-x-8">
					<IconSchool stroke={2} className="text-icon" />
					<div>
						<p className="text-secondary">광주소프트웨어마이스터고등학교</p>
						<p className="text-secondary">스마트IoT과 재학</p>
					</div>
				</li>
			</ul>
		</div>
	);
}
