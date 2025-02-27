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
      className="px-7 py-3 bg-bricn-800 active:bg-bricn-700 hover:bg-bricn-800 border-bricn-800 border rounded-sm"
    >
      {children}
    </button>
  );
}
