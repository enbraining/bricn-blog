"use client";

import { useCallback, useState } from "react";
import LineLink from "../components/LineLink";
import LineTitle from "../components/LineTitle";
import Myself from "../components/Myself";
import SelectMenu from "../components/SelectMenu";

export default function Page() {
	const [menu, setMenu] = useState<"LINK" | "CERTIFICATION">("LINK");

	const onSetMenu = useCallback((type: "LINK" | "CERTIFICATION") => {
		setMenu(type);
	}, []);

	return (
		<div>
			<Myself />
			<div className="grid grid-flow-col text-center mt-10">
				<SelectMenu setMenu={onSetMenu} initialMenu="LINK" menu={menu}>
					링크
				</SelectMenu>
				<SelectMenu setMenu={onSetMenu} initialMenu="CERTIFICATION" menu={menu}>
					자격증
				</SelectMenu>
			</div>
			<div>
				{menu === "LINK" ? (
					<div className="mt-5 grid gap-y-2">
						<LineLink type="GITHUB" href={"https://github.com/enbraining"}>
							Github
						</LineLink>
						<LineLink
							type="LINKEDIN"
							href={"https://linkedin.com/in/enbraining"}
						>
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
                    <div className="grid gap-y-2 mt-5">
                            <LineTitle
                                content="정보처리산업기사"
                                date="공부중"
                            />
                            <LineTitle
                                content="전자산업기사"
                                date="2024년 4차 과정평가형자격 합격"
                            />
                    </div>
				)}
			</div>
			{/* <div className="mt-10">
				<p className="text-xl font-bold text-neutral-800">학력</p>
				<hr className="mt-2 mb-8" />
				<div>
					<div>
						<h1 className="font-medium text-lg">광주소프트웨어마이스터고등학교</h1>
						<h2>스마트IoT과</h2>
                        <p className="text-neutral-500 text-sm">2023년 3월 – ?</p>
					</div>
				</div>
			</div> */}
		</div>
	);
}
