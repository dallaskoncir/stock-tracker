import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { store } from 'react-notifications-component';
import useIsMounted from 'ismounted';

import { API_ROUTE_BASE, API_KEY } from '../constants';
import styles from '../styles/components/CompanyOverview.module.css';
import EarningsChart from './EarningsChart';

export default function CompanyOverview({ selectedSymbol, selectedSymbols, setSelectedSymbols }) {
    const [companyData, setCompanyData] = useState({});
    const [error, setError] = useState(false);
    const isMounted = useIsMounted();

    const fetchCompanyData = async (symbol) => {
        const profileUrl = `${API_ROUTE_BASE}/stock/profile2?symbol=${symbol}&token=${API_KEY}`;
        const financialsUrl = `${API_ROUTE_BASE}/stock/metric?symbol=${symbol}&token=${API_KEY}`;
        let profileResponse = {};
        let financialsResponse = {};

        try {
            profileResponse = await axios.get(profileUrl);
            financialsResponse = await axios.get(financialsUrl);

            if (isMounted.current) {
                setCompanyData({ ...profileResponse?.data, ...financialsResponse?.data });
            }
        } catch (err) {
            setError(true);

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
        }
    };

    const renderErrorState = () => {
        return (
            <div className={styles.errorState}>
                <div className={styles.exclamation}>!</div>
                <p>There was an error fetching the company data.</p>
            </div>
        );
    };

    const formatCurrency = (str) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(str);
    };

    const handleRemoveButtonClick = (item) => {
        const newSelectedSymbols = selectedSymbols.filter((symbol) => item !== symbol);

        localStorage.setItem('selectedSymbols', newSelectedSymbols);

        setSelectedSymbols([...newSelectedSymbols]);
    };

    useEffect(() => {
        fetchCompanyData(selectedSymbol);
    }, [selectedSymbol]);

    return (
        <>
            {companyData.name ? (
                <div className={styles.selectedItem}>
                    <header className={styles.companyHeader}>
                        <h2 data-testid="company-name">{companyData.name}</h2>
                        <button
                            className={styles.removeButton}
                            data-testid="remove-button"
                            onClick={() => handleRemoveButtonClick(selectedSymbol)}>
                            X
                        </button>
                    </header>

                    <section className={styles.companyEarnings}>
                        <EarningsChart
                            annualEarnings={companyData.series.annual.eps}
                            name={companyData.name}
                        />
                    </section>

                    <section className={styles.companyStatistics}>
                        <h3>Stock Price (Past Year)</h3>
                        <p data-testid="stock-price-high">
                            High: {formatCurrency(companyData.metric['52WeekHigh'])}
                        </p>
                        <p data-testid="stock-price-low">
                            Low: {formatCurrency(companyData.metric['52WeekLow'])}
                        </p>
                    </section>
                </div>
            ) : (
                <div
                    className={`${styles.selectedItem} ${styles.loading}`}
                    data-testid="overview-loader">
                    <Loader
                        type="Puff"
                        color="#3cc3b2"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                        visible={!error}
                    />
                    {error ? renderErrorState() : null}
                </div>
            )}
        </>
    );
}

CompanyOverview.propTypes = {
    selectedSymbol: PropTypes.string.isRequired,
    selectedSymbols: PropTypes.array.isRequired,
    setSelectedSymbols: PropTypes.func.isRequired
};
