import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
	return (
		<>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
			/>
			<Script
				id="google-analytics"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gaId}');
                    `,
				}}
			/>
		</>
	);
}
