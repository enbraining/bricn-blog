import { Dispatch, SetStateAction } from 'react';

export default function Input({
  content,
  setContent,
  name,
  placeholder,
  colSpan,
}: {
  name?: string;
  placeholder?: string;
  content?: string | undefined;
  setContent?: Dispatch<SetStateAction<string | undefined>>;
  colSpan?: number;
}) {
  return setContent && content ? (
    <input
      name={name}
      placeholder={placeholder}
      className={`bg-neutral-100 border border-neutral-300 w-full p-3 text-lg ${colSpan ? `col-span-${colSpan}` : ''}`}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  ) : (
    <input
      name={name}
      placeholder={placeholder}
      className={`bg-neutral-100 border border-neutral-300 w-full p-3 text-lg ${colSpan ? `col-span-${colSpan}` : ''}`}
    />
  );
}
