import { Dispatch, SetStateAction } from 'react';

export default function Textarea({
  content,
  setContent,
}: {
  content?: string | undefined;
  setContent?: Dispatch<SetStateAction<string | undefined>>;
}) {
  return setContent && content ? (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="bg-neutral-100 border border-neutral-300 w-full h-[70vh] p-3"
      name="content"
    />
  ) : (
    <textarea
      className="bg-neutral-100 border border-neutral-300 w-full h-[70vh] p-3"
      name="content"
    />
  );
}
