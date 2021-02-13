import { render } from '@testing-library/react';

import MyApp from '../../pages/_app';

describe('<MyApp />', () => {
    it('renders correctly', () => {
        const MockComponent = () => <>Test Component</>;
        const pageProps = {};
        const { container } = render(<MyApp Component={MockComponent} pageProps={pageProps} />);

        expect(container).toMatchSnapshot();
    });
});
