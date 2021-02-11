import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';

test('Check for Getting Started Text', () => {
    const { container, getByText } = render(<Home />);

    expect(getByText('Stock Comparison')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});
