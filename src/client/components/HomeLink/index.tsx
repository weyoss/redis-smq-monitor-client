import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const HomeLink = () => {
    let match = useRouteMatch({
        path: '/',
        exact: true
    });
    if (match) return null;
    return (
        <div className={'homeLink'}>
            <Link className={'leading'} to={'/'}>
                &larr; Home
            </Link>
        </div>
    );
};

export default HomeLink;
