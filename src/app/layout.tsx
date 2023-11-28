import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/shared/Footer/Footer';
import SiteHeader from '@/app/SiteHeader';
import CommonClient from './CommonClient';
import AuthProvider from './context/AuthProvider';
import { Metadata } from 'next';


const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
  title: 'GentleDog',
  description: 'Ai추천 서비스를 제공하는 반려동물 의류 쇼핑앱',
  manifest: '/manifest.json',
  icons: { apple: '/aseets/images/icons/icon-192x192.png' },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="ko-kr" dir="" className={nanumGothic.className}>
      {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      <body className=" bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <AuthProvider>
          <SiteHeader />
          {children}
          <CommonClient />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
