import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import LocalFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import GoogleAds from "./lib/GoogleAds";
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
			<body className={`antialiased ${localFont.className}`}>
				{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				)}
				<ThemeProvider>
					<SessionProvider>
						<div className="lg:mx-[10rem] md:mx-[6rem] mx-[1rem]">
							<div className="min-h-[92vh] mb-8">
								<Header />
								{children}
							</div>
							<Footer />
						</div>
					</SessionProvider>
				</ThemeProvider>
			</body>
			{process.env.NEXT_PUBLIC_GOOGLE_PID && (
				<GoogleAds pid={process.env.NEXT_PUBLIC_GOOGLE_PID} />
			)}
		</html>
	);
}
