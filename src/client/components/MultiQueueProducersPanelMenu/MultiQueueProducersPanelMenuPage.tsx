import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import * as routes from '../../routes/routes';

interface IProps {
    count: number;
    loading: boolean;
}

const SchedulerPanelMenuPage: React.FC<IProps> = ({ count, loading }) => {
    return (
        <div className={'mb-4'}>
            <h2 className={'display-6'}>Multi-Queue Producers</h2>
            {loading ? (
                <Spinner animation={'border'} />
            ) : count ? (
                <div className={'list-group'}>
                    <Link
                        className={`text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                        to={routes.multiQueueProducers.getLink({})}
                    >
                        Producers <span className="badge bg-primary rounded-pill">{count}</span>
                    </Link>
                </div>
            ) : (
                <p>No producers yet.</p>
            )}
        </div>
    );
};

export default SchedulerPanelMenuPage;
