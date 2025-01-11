import { IconAt, IconBriefcase, IconSchool } from "@tabler/icons-react";
import Hr from "./Hr";

export default function Myself() {
	return (
		<div>
			<div className="flex items-end gap-x-3 mb-5">
				<p className="text-2xl font-bold text-bricn-500">김동학</p>
				<p className="text-base text-bricn-300">Nest.js, Next.js, C++</p>
			</div>
			<Hr />
			<ul className="text-base grid gap-y-2 mt-5">
				<li className="flex gap-x-8 items-center">
					<IconAt stroke={2} className="text-bricn-300" />
					<p className="text-bricn-400">me@bricn.net</p>
				</li>
				<li className="flex gap-x-8">
					<IconBriefcase stroke={2} className="text-bricn-300" />
					<div>
						<p className="text-bricn-400">동아리 깨소금</p>
					</div>
				</li>
				<li className="flex gap-x-8">
					<IconSchool stroke={2} className="text-bricn-300" />
					<div>
						<p className="text-bricn-400">광주소프트웨어마이스터고등학교</p>
						<p className="text-bricn-400">스마트IoT과 재학</p>
					</div>
				</li>
			</ul>
		</div>
	);
}
