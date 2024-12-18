import type { Metadata } from "next";
import LocalFont from "next/font/local";
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
      <body
        className={`antialiased ${localFont.className}`}
      >
        <div className='sm:mx-[12rem] mx-[1rem]'>
            <Header />
            {children}
        </div>
      </body>
    </html>
  );
}
