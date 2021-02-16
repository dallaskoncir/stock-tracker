import PropTypes from 'prop-types';

import styles from '../styles/components/PlaceholderCard.module.css';

export default function PlaceholderCard({ selectedSymbols }) {
    return (
        <div className={styles.placeholderCard}>
            <p data-testid="placeholder-text">
                Select {!selectedSymbols.length ? 'a' : 'an additional'} stock symbol from the
                search box above to display and compare data.
            </p>
        </div>
    );
}

PlaceholderCard.propTypes = {
    selectedSymbols: PropTypes.array.isRequired
};
