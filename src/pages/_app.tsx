import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`background min-h-screen ${inter.className}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default App;
