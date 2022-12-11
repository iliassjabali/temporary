import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@lib/Context';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

export default ({ Component, pageProps }: AppProps) => (
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Front end</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
