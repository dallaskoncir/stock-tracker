import { render, fireEvent } from '@testing-library/react';

import AutoCompleteInput from '../../components/AutoCompleteInput';

describe('<AutoCompleteInput />', () => {
    test('It should render an empty input by default', () => {
        const { getByTestId } = render(<AutoCompleteInput />);
        const searchInput = getByTestId('search-input');

        expect(searchInput.value).toBe('');
    });

    test('It should allow the user to enter search text', () => {
        const { getByTestId } = render(<AutoCompleteInput />);
        const searchInput = getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'AAP' } });

        expect(searchInput.value).toBe('AAP');
    });
});
