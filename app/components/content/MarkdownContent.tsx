/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import 'katex/dist/katex.min.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

import Markdown from "react-markdown";
import rehypeKatex from 'rehype-katex';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Pluggable } from 'unified';

export default function MarkdownContent({ content }: { content: string }) {
	return (
		<div className="lg:mx-[17rem] md:mx-[0rem] sm:mx-[0rem]">
            <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypePrismPlus as Pluggable]}
                className="markdown-body"
            >
                {content}
            </Markdown>
        </div>
	);
}
