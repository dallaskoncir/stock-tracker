import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_ROUTE_BASE } from '../constants';
import styles from '../styles/components/AutoCompleteInput.module.css';

export default function AutocompleteInput() {
    const [searchValue, setSearchValue] = useState('');
    const [bestMatches, setBestMatches] = useState([]);

    const fetchResults = () => {
        axios
            .get(`${API_ROUTE_BASE}&function=SYMBOL_SEARCH&keywords=${searchValue}`)
            .then((res) => setBestMatches(res.data.bestMatches))
            .catch((err) => console.log(err));
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
            fetchResults();
        }
    };

    useEffect(() => {
        fetchResults();
    }, [searchValue]);

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                type="text"
                value={searchValue}
            />
            {bestMatches?.length ? (
                <ul className={styles.searchResultList}>
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
