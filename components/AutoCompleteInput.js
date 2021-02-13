import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_ROUTE_BASE } from '../constants';
import styles from '../styles/components/AutoCompleteInput.module.css';

export default function AutocompleteInput() {
    const [searchValue, setSearchValue] = useState('');
    const [bestMatches, setBestMatches] = useState([]);

    const fetchResults = async (query) => {
        const url = `${API_ROUTE_BASE}&function=SYMBOL_SEARCH&keywords=${query}`;

        if (query) {
            const response = await axios.get(url);

            setBestMatches(response.data.bestMatches);
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;

        setSearchValue(value);
    };

    const handleInputBlur = () => {
        setBestMatches([]);
    };

    const handleInputFocus = () => {
        if (searchValue) {
            fetchResults(searchValue);
        }
    };

    useEffect(() => {
        fetchResults(searchValue);
    }, [searchValue]);

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                data-testid="search-input"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                type="text"
                value={searchValue}
            />
            {bestMatches?.length ? (
                <ul className={styles.searchResultList} data-testid="search-result-list">
                    {bestMatches.map((match, i) => (
                        <li className={styles.searchResultListItem} key={i}>
                            {match['2. name']}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
