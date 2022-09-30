import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { home } from '../../../routes/routes';

export default () => (
    <div className="mb-4">
        <Link to={home.getLink({})} className="link-dark display-6">
            <img src={logo} alt={'RedisSMQ'} />
        </Link>
    </div>
);
