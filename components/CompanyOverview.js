import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API_ROUTE_BASE } from '../constants';
import styles from '../styles/components/CompanyOverview.module.css';

export default function CompanyOverview({ symbol, selectedSymbols, setSelectedSymbols }) {
    const [companyData, setCompanyData] = useState({});
    const [earningsData, setEarningsData] = useState({});

    const fetchCompanyData = async () => {
        const url = `${API_ROUTE_BASE}&function=OVERVIEW&symbol=${symbol}`;
        const response = await axios.get(url);

        console.log(response.data);

        setCompanyData(response.data);
    };

    const fetchEarningsData = async () => {
        const url = `${API_ROUTE_BASE}&function=EARNINGS&symbol=${symbol}`;
        const response = await axios.get(url);

        console.log(response.data);

        setEarningsData(response.data);
    };

    const formatCurrency = (str) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(str);
    };

    const handleRemoveButtonClick = (item) => {
        const newSelectedSymbols = selectedSymbols.filter((symbol) => item !== symbol);

        setSelectedSymbols([...newSelectedSymbols]);
    };

    useEffect(() => {
        fetchCompanyData();
        fetchEarningsData();
    }, [symbol]);

    return (
        <div className={styles.selectedItem}>
            <header className={styles.companyHeader}>
                <h2>{companyData.Name}</h2>
                <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveButtonClick(symbol)}>
                    X Remove
                </button>
            </header>

            <section className={styles.companyEarnings}>
                {earningsData.annualEarnings?.map((earnings, i) => {
                    console.log(earnings);
                })}
            </section>

            <section className={styles.companyStatistics}>
                <h3>Statistics</h3>
                <p>High: {formatCurrency(companyData['52WeekHigh'])}</p>
                <p>Low: {formatCurrency(companyData['52WeekLow'])}</p>
            </section>
        </div>
    );
}

CompanyOverview.propTypes = {
    symbol: PropTypes.string.isRequired,
    selectedSymbols: PropTypes.array.isRequired,
    setSelectedSymbols: PropTypes.func.isRequired
};