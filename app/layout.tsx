import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import GoogleAds from './components/google/GoogleAds';
import GoogleAnalytics from './components/google/GoogleAnalytics';

const localFont = LocalFont({
  src: '../public/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'Bricn blog',
  description: "Donghak Kim's tech blog",
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
        <div className="md:mx-[2rem] mx-[1rem]">
          <Header />
          <div className="py-24">{children}</div>
          <Footer />
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_PID && (
        <GoogleAds pid={process.env.NEXT_PUBLIC_GOOGLE_PID} />
      )}
    </html>
  );
}
