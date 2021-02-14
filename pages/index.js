import { useState } from 'react';
import Head from 'next/head';

import AutoCompleteInput from '../components/AutoCompleteInput';
import CompanyOverview from '../components/CompanyOverview';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
    const [selectedSymbols, setSelectedSymbols] = useState([]);

    return (
        <>
            <Head>
                <title>Stock Tracker App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <header>
                    <h1 className={styles.title}>Stock Comparison</h1>
                    <p>Search and select up to 3 stocks to compare.</p>
                </header>

                <AutoCompleteInput
                    selectedSymbols={selectedSymbols}
                    setSelectedSymbols={setSelectedSymbols}
                />

                <section className={styles.contentArea}>
                    {selectedSymbols.map((symbol, i) => (
                        <CompanyOverview
                            key={i}
                            symbol={symbol}
                            selectedSymbols={selectedSymbols}
                            setSelectedSymbols={setSelectedSymbols}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}
