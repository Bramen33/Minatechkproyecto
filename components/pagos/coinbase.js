// utils/coinbase.js
import axios from "axios";

const COINBASE_API_URL = "https://api.commerce.coinbase.com/charges";

export const createCoinbaseCharge = async (name, description, amount, currency) => {
    try {
        const response = await axios.post(
            COINBASE_API_URL,
            {
                name,
                description,
                pricing_type: "fixed_price",
                local_price: {
                    amount,
                    currency,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CC-Api-Key": process.env.NEXT_PUBLIC_COINBASE_API_KEY,
                    "X-CC-Version": "2018-03-22",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating Coinbase charge:", error);
        throw error;
    }
};
