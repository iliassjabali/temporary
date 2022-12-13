import { render, screen } from '@testing-library/react';
import Loading from "@/components/Loading";

describe('Loading', () => {
    it('renders without crashing', () => {
        render(<Loading />);
    });
});

