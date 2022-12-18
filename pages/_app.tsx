import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../components/theme';
import { supabase } from '../infra/supabase';
import type { AppRouter } from './api/trpc/[trpc]';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Auth.UserContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3450/api/trpc';
    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(App);
