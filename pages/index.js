import Head from 'next/head';

import AutoCompleteInput from '../components/AutoCompleteInput';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>Stock Tracker App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Stock Comparison</h1>
                <p>Search and select up to 3 stocks to compare.</p>
                <AutoCompleteInput />
            </main>
        </>
    );
}
