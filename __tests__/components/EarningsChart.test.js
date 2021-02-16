import { render } from '@testing-library/react';

import EarningsChart from '../../components/EarningsChart';

describe('<EarningsChart />', () => {
    test('Renders correctly with annualEarnings data supplied', () => {
        const annualEarnings = [
            { period: '2020-09-26', v: 3.2753 },
            { period: '2019-09-28', v: 2.9714 }
        ];
        const { container } = render(
            <EarningsChart name="Apple Inc." annualEarnings={annualEarnings} />
        );

        expect(container).toMatchSnapshot();
    });
});
