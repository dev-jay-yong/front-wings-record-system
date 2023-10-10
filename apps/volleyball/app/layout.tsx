import type { Metadata } from 'next';
import { Header } from './components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: '윙즈 경기 기록 사이트',
  description: '윙즈 경기 기록 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
