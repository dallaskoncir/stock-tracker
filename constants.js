// Ideally we would only use an env variable here but to keep things simple for local testing, I have added the API key here as well
export const AV_API_KEY = 'LKQ7049IHKY35G5N';
export const API_ROUTE_BASE = `https://www.alphavantage.co/query?apikey=${
    process.env.AV_API_KEY || AV_API_KEY
}`;
