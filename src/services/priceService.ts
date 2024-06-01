import axios from 'axios';
import dotenv from 'dotenv';
import cache from '../utils/cache';

dotenv.config();

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrice = async (cryptocurrency: string) => {
    const cacheKey = `price:${cryptocurrency}`;
    try {
        const data = await cache.get(cacheKey);
        if (data) {
            return JSON.parse(data);
        } else {
            const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
                params: {
                    ids: cryptocurrency,
                    vs_currencies: 'usd'
                },
                headers: {
                    'Authorization': `Bearer ${process.env.COINGECKO_API_KEY}`
                }
            });
            await cache.setEx(cacheKey, 60, JSON.stringify(response.data));
            console.log(response.data)
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
