import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="mb-4">
        <Link to={'/'} className="link-dark display-6">
            RedisSMQ <small className="text-muted">Monitor</small>
        </Link>
    </div>
);
