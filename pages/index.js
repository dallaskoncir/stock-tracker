import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import styles from '../styles/pages/Home.module.css';

const PlaceholderCardNoSSR = dynamic(() => import('../components/PlaceholderCard'), {
    ssr: false
});

const AutoCompleteInputNoSSR = dynamic(() => import('../components/AutoCompleteInput'), {
    ssr: false
});

const CompanyOverviewNoSSR = dynamic(() => import('../components/CompanyOverview'), {
    ssr: false
});

export default function Home() {
    const [selectedSymbols, setSelectedSymbols] = useState([]);

    if (typeof window !== 'undefined' && !selectedSymbols.length) {
        const savedSymbols = localStorage.getItem('selectedSymbols');

        if (savedSymbols) {
            setSelectedSymbols(savedSymbols.split(','));
        }
    }

    useEffect(() => {
        localStorage.setItem('selectedSymbols', selectedSymbols);
    }, [selectedSymbols]);

    return (
        <>
            <Head>
                <title>Stock Tracker App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ReactNotifications />

            <main className={styles.main}>
                <header>
                    <h1 className={styles.title}>Stock Comparison</h1>
                    <p>Search and select up to 3 stocks to compare.</p>
                </header>

                <AutoCompleteInputNoSSR
                    selectedSymbols={selectedSymbols}
                    setSelectedSymbols={setSelectedSymbols}
                />

                <section className={styles.contentArea}>
                    <>
                        {selectedSymbols.map((symbol, i) => (
                            <CompanyOverviewNoSSR
                                key={i}
                                selectedSymbol={symbol}
                                selectedSymbols={selectedSymbols}
                                setSelectedSymbols={setSelectedSymbols}
                            />
                        ))}

                        {selectedSymbols.length < 3 ? (
                            <PlaceholderCardNoSSR selectedSymbols={selectedSymbols} />
                        ) : null}
                    </>
                </section>
            </main>
        </>
    );
}
