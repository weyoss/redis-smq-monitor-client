import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { generateRoutePath } from '../../routes/routes';

interface IProps {
    count: number;
    loading: boolean;
}

const SchedulerPage: React.FC<IProps> = ({ count, loading }) => {
    return (
        <div className={'mb-5'}>
            <h2 className={'display-5'}>Scheduler</h2>
            <div className={'list-group'}>
                {loading ? (
                    <Spinner animation={'border'} />
                ) : (
                    <Link
                        className={`text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                        to={generateRoutePath('scheduledMessages', {})}
                    >
                        Messages <span className="badge bg-primary rounded-pill">{count}</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default SchedulerPage;
