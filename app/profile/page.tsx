"use client";

import { IconAt, IconBriefcase, IconSchool } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import LineLink from "../components/LineLink";
import LineTitle from "../components/LineTitle";
import SelectMenu from "../components/SelectMenu";

export default function Page() {
	const [menu, setMenu] = useState<"LINK" | "CERTIFICATION">("LINK");

	const onSetMenu = useCallback((type: "LINK" | "CERTIFICATION") => {
		setMenu(type);
	}, []);

	return (
		<div>
			<div className="flex items-center gap-x-3 mb-5">
				<p className="text-2xl font-bold text-neutral-800">김동학</p>
				<p className="text-base font-light text-neutral-700">
					Nest.js, Next.js, C++
				</p>
			</div>
			<hr />
			<ul className="text-base text-neutral-800 grid gap-y-2 mt-5">
				<li className="flex gap-x-8 items-center">
					<IconAt stroke={2} className="text-neutral-500" />
					<p>me@bricn.net</p>
				</li>
				<li className="flex gap-x-8">
					<IconBriefcase stroke={2} className="text-neutral-500" />
					<div>
						<p>동아리 깨소금</p>
					</div>
				</li>
				<li className="flex gap-x-8">
					<IconSchool stroke={2} className="text-neutral-500" />
					<div>
						<p>광주소프트웨어마이스터고등학교</p>
						<p>스마트IoT과 재학</p>
					</div>
				</li>
			</ul>
			<div className="grid grid-flow-col text-center mt-10">
				<SelectMenu setMenu={onSetMenu} initialMenu="LINK" menu={menu}>
					링크
				</SelectMenu>
				<SelectMenu setMenu={onSetMenu} initialMenu="CERTIFICATION" menu={menu}>
					자격증
				</SelectMenu>
			</div>
			{menu === "LINK" ? (
				<div className="mt-5 grid gap-y-2">
					<LineLink type="GITHUB" href={"https://github.com/enbraining"}>
						Github
					</LineLink>
					<LineLink type="LINKEDIN" href={"https://linkedin.com/in/enbraining"}>
						LinkedIn
					</LineLink>
					<LineLink
						type="SOLVEDAC"
						href={"https://solved.ac/profile/enbraining"}
					>
						Solved.ac
					</LineLink>
				</div>
			) : (
				<div className="mt-5 grid gap-y-2">
					<LineTitle content="전자산업기사" date="2024년 12월 24일 결과 발표" />
				</div>
			)}
		</div>
	);
}
