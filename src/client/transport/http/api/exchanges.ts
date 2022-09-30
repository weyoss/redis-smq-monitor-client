import axios from 'axios';
import { API_URL } from '../../endpoints';

export const getExchanges = async () => {
    return axios.get(
        `${API_URL}/api/exchanges`
    );
};