import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { QueryProvider } from '@/pages/_app';
import { renderHook } from '@testing-library/react';


describe('useInfiniteQuery hook', () => {
    it('should return the expected data from the API', async () => {
        const { result } = renderHook(() => useInfiniteQuery(5), {
            wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        });
        expect(result.current).toBeDefined();
    });
})

