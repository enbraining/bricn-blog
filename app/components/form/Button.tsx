import React from 'react';

export default function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-7 py-3 bg-neutral-100 active:bg-neutral-200 border-neutral-300 border rounded-sm"
    >
      {children}
    </button>
  );
}
