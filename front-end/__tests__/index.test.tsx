import { render, screen } from '@testing-library/react';
import Index from '@/pages/index';
import {
    ReduxProvider,
    QueryProvider
} from '@/pages/_app';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('Index', () => {
	it('renders without crashing', () => {
        mockAllIsIntersecting(true);
		render(
			<ReduxProvider>
                <QueryProvider>
                    <Index />
                </QueryProvider>
            </ReduxProvider>
		);
	});
});
