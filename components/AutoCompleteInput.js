import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { Puff } from 'react-loader-spinner';

import { API_ROUTE_BASE, API_KEY } from '../constants';
import styles from '../styles/components/AutoCompleteInput.module.css';

export default function AutocompleteInput({ selectedSymbols, setSelectedSymbols }) {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [fetchingResults, setFetchingResults] = useState(false);

    const fetchResults = async (query) => {
        if (query) {
            const url = `${API_ROUTE_BASE}/search?q=${query}&token=${API_KEY}`;
            let response = [];

            setFetchingResults(true);

            try {
                response = await axios.get(`${url}`);

                setResults(response.data.result);
            } catch (err) {
                store.addNotification({
                    title: 'Error!',
                    message: err.message,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            } finally {
                setFetchingResults(false);
            }
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
        setResults([]);
    };

    useEffect(() => {
        fetchResults(searchValue);
    }, [searchValue]);

    useEffect(() => {
        if (selectedSymbols.length === 3) {
            setSearchValue('');
            setResults([]);
        }
    }, [selectedSymbols]);

    return (
        <div className={styles.autoCompleteContainer}>
            <div className={styles.searchInputContainer}>
                <input
                    className={styles.searchInput}
                    data-testid="search-input"
                    onChange={handleInputChange}
                    type="text"
                    value={searchValue}
                    disabled={selectedSymbols.length === 3}
                    placeholder={
                        selectedSymbols.length === 3 ? 'Remove a company to search again' : null
                    }
                />
                {fetchingResults && (
                    <div className={styles.searchLoading} data-testid="search-loading">
                        <Puff color="#3cc3b2" height={24} width={24} visible={fetchingResults} />
                    </div>
                )}
                {searchValue && (
                    <button
                        className={styles.clearSearchButton}
                        data-testid="search-clear-button"
                        onClick={handleClearInput}>
                        X
                    </button>
                )}
            </div>

            {results?.length ? (
                <ul className={styles.searchResultList} data-testid="search-result-list">
                    {results.map((result, i) => {
                        const { description, symbol } = result;

                        return (
                            <li
                                className={styles.searchResultListItem}
                                key={i}
                                onClick={() => handleResultClick(symbol)}>
                                {description} ({symbol})
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
