import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../pages/index';

test('<Home /> renders correctly', () => {
    const { container, getByText } = render(<Home />);

    expect(getByText('Stock Comparison')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});
