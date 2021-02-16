import { render } from '@testing-library/react';

import PlaceholderCard from '../../components/PlaceholderCard';

describe('<PlaceholderCard />', () => {
    test('Renders correct text with no symbols selected', () => {
        const { getByTestId } = render(<PlaceholderCard selectedSymbols={[]} />);

        expect(getByTestId('placeholder-text')).toHaveTextContent('a stock symbol');
    });

    test('Renders correct text with one stock selected', () => {
        const { getByTestId } = render(<PlaceholderCard selectedSymbols={['AAPL']} />);

        expect(getByTestId('placeholder-text')).toHaveTextContent('an additional stock symbol');
    });

    test('Renders correct text with two stocks selected', () => {
        const { getByTestId } = render(<PlaceholderCard selectedSymbols={['AAPL', 'AMZN']} />);

        expect(getByTestId('placeholder-text')).toHaveTextContent('an additional stock symbol');
    });
});
