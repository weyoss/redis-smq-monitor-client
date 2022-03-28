import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import * as routes from '../../routes/routes';

interface IProps {
    count: number;
    loading: boolean;
}

const SchedulerPanelBoxPage: React.FC<IProps> = ({ count, loading }) => {
    return (
        <div className={'mb-4'}>
            <h2 className={'display-6'}>Scheduled</h2>
            {loading ? (
                <Spinner animation={'border'} />
            ) : count ? (
                <div className={'list-group'}>
                    <Link
                        className={`text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                        to={routes.scheduledMessages.getLink({})}
                    >
                        Messages <span className="badge bg-primary rounded-pill">{count}</span>
                    </Link>
                </div>
            ) : (
                <p>No scheduled messages yet.</p>
            )}
        </div>
    );
};

export default SchedulerPanelBoxPage;
