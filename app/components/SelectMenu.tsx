export default function SelectMenu({
	children,
	setMenu,
	menu,
	initialMenu,
}: {
	children: React.ReactNode;
	menu: "LINK" | "CERTIFICATION";
	initialMenu: "LINK" | "CERTIFICATION";
	setMenu: (type: "LINK" | "CERTIFICATION") => void;
}) {
	return (
		<div
			className={`border-b py-2 ${menu === initialMenu ? "bg-neutral-200 border-neutral-400" : "hover:bg-neutral-100 bg-white border-neutral-200"}`}
			onClick={() => setMenu(initialMenu)}
		>
			{children}
		</div>
	);
}
