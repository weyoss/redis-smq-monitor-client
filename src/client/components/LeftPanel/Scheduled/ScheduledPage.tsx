import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../routes/routes';

interface IProps {
    count: number;
}

const ScheduledPage: React.FC<IProps> = ({ count }) => {
    return (
        <div className={'mb-4'}>
            <h2 className={'display-6'}>Scheduled</h2>
            { count ? (
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

export default ScheduledPage;
