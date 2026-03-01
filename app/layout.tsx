import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './components/theme-provider';

export const metadata: Metadata = {
  title: 'Fakey Nails',
  description: 'Professionell nagelstudio i Stockholm.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body>
        <ThemeProvider>{props.children}</ThemeProvider>
      </body>
    </html>
  );
}
