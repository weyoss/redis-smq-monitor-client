import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default () => (
    <div className="mb-4">
        <Link to={'/'} className="link-dark display-6">
            <img src={logo} alt={'RedisSMQ'} />
        </Link>
    </div>
);
