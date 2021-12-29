import { useCallback } from 'react';
import { useHistory } from 'react-router';
import queryString from 'query-string';

const useUrlParams = () => {
    const history = useHistory();

    const setUrlParam = useCallback(
        (key: string, value: string) => {
            const params = queryString.parse(location.search);
            params[key] = value;
            history.push(`${location.pathname}?${queryString.stringify(params)}`);
        },
        [location.search]
    );

    const getUrlParam = useCallback(
        (key: string): string | undefined => {
            const params = queryString.parse(location.search);
            const value = params[key];
            if (typeof value === 'string') return value;
            return undefined;
        },
        [location.search]
    );

    return { setUrlParam, getUrlParam };
};

export default useUrlParams;
