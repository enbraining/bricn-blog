'use client';

import 'katex/dist/katex.min.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import { useState } from 'react';

import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Pluggable } from 'unified';

export default function MarkdownContent({ content }: { content: string }) {
  const [headings, setHeadings] = useState<string[]>([]);

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypePrismPlus as Pluggable]}
      className="markdown-body overflow-x-scroll w-full"
      components={{
        h1: ({ children }) => {
          setHeadings([...headings, children]);
          return <h1>{children}</h1>;
        },
      }}
    >
      {content}
    </Markdown>
  );
}
