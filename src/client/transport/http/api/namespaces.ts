import axios from 'axios';
import { API_URL } from './index';

export const deleteNamespace = async (ns: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}`);
};
