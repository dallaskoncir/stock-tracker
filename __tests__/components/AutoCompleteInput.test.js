import { render, fireEvent, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';

import AutoCompleteInput from '../../components/AutoCompleteInput';

describe('<AutoCompleteInput />', () => {
    const setup = () => {
        const props = { selectedSymbols: [], setSelectedSymbols: jest.fn() };
        const utils = render(<AutoCompleteInput {...props} />);
        const searchInput = utils.getByTestId('search-input');

        return {
            searchInput,
            ...utils
        };
    };

    test('Renders an empty input by default', () => {
        const { searchInput } = setup();

        expect(searchInput.value).toBe('');
    });

    test('Entering text into the search input fetches data from the API and displays a result list', async () => {
        const data = {
            data: {
                result: [
                    {
                        symbol: 'AAP',
                        description: 'Advanced Auto Parts'
                    },
                    {
                        symbol: 'AAPL',
                        description: 'Apple Inc'
                    }
                ]
            }
        };

        mockedAxios.get.mockResolvedValueOnce(data);

        const { searchInput, getByTestId } = setup();

        await waitFor(() => {
            fireEvent.change(searchInput, { target: { value: 'AAP' } });
        });

        const searchResultList = getByTestId('search-result-list');

        await waitFor(() => {
            expect(searchInput.value).toBe('AAP');
            expect(searchResultList).toBeInTheDocument();
        });
    });
});
