import { render } from '@testing-library/react';

import Home from '../pages/index';

describe('<Home />', () => {
    it('renders correctly', () => {
        const { container } = render(<Home />);

        expect(container).toMatchSnapshot();
    });
});
