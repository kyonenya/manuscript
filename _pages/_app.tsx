// // import { Auth } from '@supabase/ui';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { AppProps } from 'next/app';
// import { trpc } from '../hooks/trpc';
// // import { supabase } from '../infra/supabase';
// import './globals.css';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       refetchOnWindowFocus: false,
//       staleTime: Infinity,
//     },
//   },
// });

// function App({ Component, pageProps }: AppProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {/* <Auth.UserContextProvider supabaseClient={supabase}> */}
//       <Component {...pageProps} />
//       <ReactQueryDevtools initialIsOpen={false} />
//       {/* </Auth.UserContextProvider> */}
//     </QueryClientProvider>
//   );
// }
// // @ts-ignore
// export default trpc.withTRPC(App);
