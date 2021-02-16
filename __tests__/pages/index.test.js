import { render, waitFor } from '@testing-library/react';

import Home from '../../pages/index';

describe('<Home />', () => {
    test('renders correctly', async () => {
        const { container } = render(<Home />);

        await waitFor(() => expect(container).toMatchSnapshot());
    });
});
