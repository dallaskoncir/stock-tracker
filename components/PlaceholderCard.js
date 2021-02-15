import styles from '../styles/components/PlaceholderCard.module.css';

export default function PlaceholderCard() {
    return (
        <div className={styles.placeholderCard}>
            <p>
                Select an additional stock symbol from the search box above to display and compare
                data.
            </p>
        </div>
    );
}
