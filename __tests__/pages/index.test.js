import { render, waitFor } from '@testing-library/react';

import Home from '../../pages/index';

describe('<Home />', () => {
    it('renders correctly', async () => {
        const { container } = render(<Home />);

        await waitFor(() => expect(container).toMatchSnapshot());
    });
});
