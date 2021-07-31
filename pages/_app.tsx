import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../components/theme';
import { supabase } from '../infra/supabase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
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
