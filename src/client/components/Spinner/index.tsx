import React from 'react';
import { SpinnerPropsInterface } from './contract';

const Spinner: React.FC<SpinnerPropsInterface> = ({ loading }) => {
    if (!loading) {
        return null;
    }
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
