import Script from "next/script";

export default function GoogleAds() {
	return (
		<Script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5938651528318065"
			crossOrigin="anonymous"
		/>
	);
}
