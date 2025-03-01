import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default function Input({
  content,
  setContent,
  name,
  placeholder,
}: {
  name?: string;
  placeholder?: string;
  content?: string | undefined;
  setContent?: Dispatch<SetStateAction<string | undefined>>;
}) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setContent) {
      setContent(event.target.value);
    }
  };

  return (
    <input
      name={name}
      placeholder={placeholder}
      className={`bg-neutral-100 border border-neutral-300 w-full p-3 text-lg`}
      value={content}
      onChange={onChange}
    />
  );
}
