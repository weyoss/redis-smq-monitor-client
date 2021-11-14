import { useSelector as useReduxSelector } from 'react-redux';
import { isEqual } from 'lodash';

const useSelector: typeof useReduxSelector = (selector) => {
    return useReduxSelector(selector, isEqual);
};

export default useSelector;
