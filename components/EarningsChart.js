import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { API_ROUTE_BASE } from '../constants';

export default function EarningsChart({ symbol, name }) {
    const [earningsData, setEarningsData] = useState({});

    const fetchEarningsData = async () => {
        const url = `${API_ROUTE_BASE}&function=EARNINGS&symbol=${symbol}`;
        const response = await axios.get(url);

        setEarningsData(response.data);
    };

    useEffect(() => {
        fetchEarningsData();
    }, []);

    const mappedEarningsData = earningsData?.annualEarnings?.map((data) => {
        const { fiscalDateEnding, reportedEPS } = data;
        const formattedEps = Number(reportedEPS);

        return [fiscalDateEnding, formattedEps];
    });

    const options = {
        constructorType: 'stockChart',
        series: [
            {
                name,
                data: mappedEarningsData?.length ? [...mappedEarningsData.reverse()] : []
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
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
