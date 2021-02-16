import { render, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';

import CompanyOverview from '../../components/CompanyOverview';

describe('<CompanyOverview />', () => {
    test('Renders a loader by default', () => {
        const { getByTestId } = render(
            <CompanyOverview
                selectedSymbol="AAPL"
                selectedSymbols={['AAPL']}
                setSelectedSymbols={jest.fn()}
            />
        );

        expect(getByTestId('overview-loader')).toBeInTheDocument();
    });

    test('Fetches company data if stock symbol selected', async () => {
        const data1 = {
            data: {
                name: 'Apple Inc.'
            }
        };

        const data2 = {
            data: {
                metric: {
                    '52WeekHigh': 145.09,
                    '52WeekLow': 53.1525
                },
                series: {
                    annual: {
                        eps: [
                            { period: '2020-09-26', v: 3.2753 },
                            { period: '2019-09-28', v: 2.9714 }
                        ]
                    }
                }
            }
        };

        Promise.all([
            mockedAxios.get.mockResolvedValueOnce(data1),
            mockedAxios.get.mockResolvedValueOnce(data2)
        ]);

        const { getByTestId, getByText } = render(
            <CompanyOverview
                selectedSymbol="AAPL"
                selectedSymbols={['AAPL']}
                setSelectedSymbols={jest.fn()}
            />
        );

        await waitFor(() => {
            expect(getByTestId('company-name')).toHaveTextContent('Apple Inc');
            expect(getByTestId('remove-button')).toBeInTheDocument();
            expect(getByText('Annual Earnings Per Share')).toBeInTheDocument();
            expect(getByTestId('stock-price-high')).toHaveTextContent('High: $145.09');
            expect(getByTestId('stock-price-low')).toHaveTextContent('Low: $53.15');
        });
    });
});
