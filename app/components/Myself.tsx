import { IconAt, IconBriefcase, IconSchool } from "@tabler/icons-react";
import Hr from "./Hr";

export default function Myself() {
	return (
		<div>
			<div className="flex items-center gap-x-3 mb-5">
				<p className="text-2xl font-bold text-primary">김동학</p>
				<p className="text-base text-secondary">Nest.js, Next.js, C++</p>
			</div>
			<Hr />
			<ul className="text-base grid gap-y-2 mt-5">
				<li className="flex gap-x-8 items-center">
					<IconAt stroke={2} className="text-icon" />
					<p className="text-secondary">me@bricn.net</p>
				</li>
				<li className="flex gap-x-8">
					<IconBriefcase stroke={2} className="text-icon" />
					<div>
						<p className="text-secondary">동아리 깨소금</p>
					</div>
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
