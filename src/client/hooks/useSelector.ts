import { shallowEqual, useSelector as useReduxSelector } from 'react-redux';

const useSelector: typeof useReduxSelector = (selector) => {
    return useReduxSelector(selector, shallowEqual);
};

export default useSelector;
