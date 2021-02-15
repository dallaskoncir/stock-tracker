import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { API_ROUTE_BASE } from '../constants';
import styles from '../styles/components/CompanyOverview.module.css';
import EarningsChart from './EarningsChart';

export default function CompanyOverview({ symbol, selectedSymbols, setSelectedSymbols }) {
    const [companyData, setCompanyData] = useState({});

    const fetchCompanyData = async () => {
        const url = `${API_ROUTE_BASE}&function=OVERVIEW&symbol=${symbol}`;
        const response = await axios.get(url);

        setCompanyData(response.data);
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
    }, [symbol]);

    return (
        <>
            {companyData.Name ? (
                <div className={styles.selectedItem}>
                    <header className={styles.companyHeader}>
                        <h2>{companyData.Name}</h2>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleRemoveButtonClick(symbol)}>
                            X
                        </button>
                    </header>

                    <section className={styles.companyEarnings}>
                        <EarningsChart symbol={symbol} name={companyData.Name} />
                    </section>

                    <section className={styles.companyStatistics}>
                        <h3>Stock Price (Past Year)</h3>
                        <p>High: {formatCurrency(companyData['52WeekHigh'])}</p>
                        <p>Low: {formatCurrency(companyData['52WeekLow'])}</p>
                    </section>
                </div>
            ) : (
                <div className={`${styles.selectedItem} ${styles.loading}`}>
                    <Loader
                        type="Puff"
                        color="#3cc3b2"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                    />
                </div>
            )}
        </>
    );
}

CompanyOverview.propTypes = {
    symbol: PropTypes.string.isRequired,
    selectedSymbols: PropTypes.array.isRequired,
    setSelectedSymbols: PropTypes.func.isRequired
};
