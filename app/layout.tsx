import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import LocalFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import GoogleAnalytics from "./lib/GoogleAnalytics";

const localFont = LocalFont({
	src: "../public/fonts/PretendardVariable.woff2",
});

export const metadata: Metadata = {
	title: "Bricn Portfolio",
	description: "Donghak Kim's portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5938651528318065"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={`antialiased ${localFont.className}`}>
				{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				)}
				<ThemeProvider>
					<div className="lg:mx-[16rem] md:mx-[6rem] mx-[1rem]">
						<div className="min-h-[92vh] mb-8">
							<Header />
							{children}
						</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
