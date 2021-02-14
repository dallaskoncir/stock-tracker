import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API_ROUTE_BASE } from '../constants';
import styles from '../styles/components/AutoCompleteInput.module.css';

export default function AutocompleteInput({ selectedSymbols, setSelectedSymbols }) {
    const [searchValue, setSearchValue] = useState('');
    const [bestMatches, setBestMatches] = useState([]);

    const fetchResults = async (query) => {
        if (query) {
            const url = `${API_ROUTE_BASE}&function=SYMBOL_SEARCH&keywords=${query}`;
            const response = await axios.get(url);

            setBestMatches(response.data.bestMatches);
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;

        setSearchValue(value);
    };

    const handleResultClick = (symbol) => {
        if (selectedSymbols.length < 3) {
            setSelectedSymbols([...selectedSymbols, symbol]);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setBestMatches([]);
    };

    useEffect(() => {
        fetchResults(searchValue);
    }, [searchValue]);

    return (
        <div className={styles.autoCompleteContainer}>
            <div className={styles.searchInputContainer}>
                <input
                    className={styles.searchInput}
                    data-testid="search-input"
                    onChange={handleInputChange}
                    type="text"
                    value={searchValue}
                />
                <button className={styles.clearSearchButton} onClick={handleClearInput}>
                    X
                </button>
            </div>

            {bestMatches?.length ? (
                <ul className={styles.searchResultList} data-testid="search-result-list">
                    {bestMatches.map((match, i) => {
                        const symbol = match['1. symbol'];
                        const name = match['2. name'];

                        return (
                            <li
                                className={styles.searchResultListItem}
                                key={i}
                                onClick={() => handleResultClick(symbol)}>
                                {name} ({symbol})
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}

AutocompleteInput.propTypes = {
    selectedSymbols: PropTypes.array.isRequired,
    setSelectedSymbols: PropTypes.func.isRequired
};
