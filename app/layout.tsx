import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './globals.css';
import GoogleAds from './components/google/GoogleAds';
import GoogleAnalytics from './components/google/GoogleAnalytics';
import CmdK from './components/layout/CmdK';
import { config } from './config';

const localFont = LocalFont({
  src: '../public/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: config.siteTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${localFont.className}`}>
        <CmdK />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <div className="xl:mx-[18rem] lg:mx-[10rem] mx-[1rem]">
          <div className="min-h-screen">
            <Header />
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_PID && (
        <GoogleAds pid={process.env.NEXT_PUBLIC_GOOGLE_PID} />
      )}
    </html>
  );
}
