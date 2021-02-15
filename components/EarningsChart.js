import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function EarningsChart({ name, annualEarnings }) {
    const mappedEarningsData = annualEarnings.map((data) => {
        const { period, v } = data;
        const formattedDate = Date.parse(period);

        return [formattedDate, v];
    });

    const options = {
        constructorType: 'stockChart',
        series: [
            {
                name,
                data: mappedEarningsData.reverse()
            }
        ],
        title: {
            text: 'Annual Earnings Per Share'
        },
        xAxis: {
            labels: {
                format: '{value:%Y-%m-%d}',
                rotation: 45,
                align: 'left'
            },
            tickPixelInterval: 50,
            type: 'datetime'
        }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

EarningsChart.propTypes = {
    name: PropTypes.string.isRequired,
    annualEarnings: PropTypes.array.isRequired
};
