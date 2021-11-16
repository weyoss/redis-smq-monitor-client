import React from 'react';
import { Link } from 'react-router-dom';

const Scheduler: React.FC = () => {
    return (
        <div className={'mb-5'}>
            <h2 className={'display-5'}>Scheduler</h2>
            <div className={'list-group'}>
                <Link
                    className={`text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                    to={'#'}
                >
                    Messages <span className="badge bg-primary rounded-pill">{0}</span>
                </Link>
            </div>
        </div>
    );
};

export default Scheduler;
