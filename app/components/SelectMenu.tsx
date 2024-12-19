export default function SelectMenu({ children, setMenu, menu, initialMenu }: {
    children: React.ReactNode;
    menu: "LINK" | "CERTIFICATION";
    initialMenu: "LINK" | "CERTIFICATION";
    setMenu: (type: "LINK" | "CERTIFICATION") => void }
) {
    return (
        <div className={`border-b py-2 bg-white ${menu == initialMenu ? 'bg-[#ddd] border-neutral-400' : 'hover:bg-neutral-100 hover:border-neutral-300'}`} onClick={() => setMenu(initialMenu)}>{children}</div>
    )
}
