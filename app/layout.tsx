import type { Metadata } from "next";
import LocalFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

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
		<html lang="en">
			<body className={`antialiased ${localFont.className}`}>
				<div className="lg:mx-[16rem] md:mx-[6rem] mx-[1rem]">
					<div className="min-h-[92vh]">
						<Header />
						{children}
					</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
