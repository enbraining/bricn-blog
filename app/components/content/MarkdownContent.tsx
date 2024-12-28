"use client"

import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

export default function MarkdownContent({ content }: { content: string }) {
    return (
        <Markdown
				components={{
					code({ inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");

						if (!inline && match) {
							return (
								<SyntaxHighlighter {...props} language={match[1]} PreTag="div">
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							);
						}
						return (
							<code
								{...props}
								className={`${className || ""} inline-code text-[#905]`}
							>
								{children}
							</code>
						);
					},
				}}
				remarkPlugins={[
                    remarkGfm,
                ]}
				className="markdown-content"
			>
				{content}
			</Markdown>
    )
}
