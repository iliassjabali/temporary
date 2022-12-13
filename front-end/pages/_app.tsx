import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../components/Context';
import { Provider } from 'react-redux';
import { ReactNode, StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});
export const ReduxProvider = ({ children }: {children : ReactNode}) => (
	<Provider store={store}>{children}</Provider>
);
export const QueryProvider = ({ children }: {children : ReactNode}) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ({ Component, pageProps }: AppProps) => (
	<StrictMode>
		<ReduxProvider>
			<QueryProvider>
				<Head>
					<title>Front end</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</QueryProvider>
		</ReduxProvider>
	</StrictMode>
);
