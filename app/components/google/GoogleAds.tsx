import Script from "next/script";

export default function GoogleAds({ pid }: { pid: string}) {
	return (
		<Script
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pid}`}
			crossOrigin="anonymous"
		/>
	);
}
