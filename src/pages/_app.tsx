import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <div className={`background min-h-screen ${inter.className}`}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
