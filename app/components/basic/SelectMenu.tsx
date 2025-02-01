export default function SelectMenu({
  children,
  setMenu,
  menu,
  initialMenu,
}: {
  children: React.ReactNode;
  menu: 'LINK' | 'CERTIFICATION';
  initialMenu: 'LINK' | 'CERTIFICATION';
  setMenu: (type: 'LINK' | 'CERTIFICATION') => void;
}) {
  return (
    <div
      className={`border-b py-2 ${menu === initialMenu ? 'bg-selected border-neutral-400' : 'hover:bg-hover border-line'}`}
      onClick={() => setMenu(initialMenu)}
    >
      {children}
    </div>
  );
}
