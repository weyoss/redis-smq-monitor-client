import React from 'react';
import * as routes from '../../../routes/routes';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import { IParameterizedRouteProps } from '../../../routes/common';

const relative = (child: string, parent: string) => {
    if (parent === '/') return true;
    child = child.replace(/^\/+|\/+$/g, '');
    parent = parent.replace(/^\/+|\/+$/g, '');
    if (child === parent) return true;
    return parent
        .replace(/^\/+|\/+$/g, '')
        .split('/')
        .filter((i) => i.length)
        .every((token, idx) => child.split('/')[idx] === token);
};

const Breadcrumbs: React.FC<RouteComponentProps> = ({ match }) => {
    const crumbs = Object.values<IParameterizedRouteProps<any>>(routes)
        .filter(({ path }: RouteProps) => typeof path === 'string' && relative(match.path, path))
        .map(({ path, ...rest }) => ({
            path: Object.keys(match.params).length
                ? Object.keys(match.params).reduce(
                      (path: string, param) => path.replace(`:${param}`, (match.params as any)[param]),
                      path as string
                  )
                : path,
            ...rest
        }));
    if (crumbs.length <= 1) {
        return null;
    }
    return (
        <div className={'mb-3'}>
            {crumbs.map((item, index) => (
                <span key={index}>
                    <span>/</span>
                    <Link className={'ms-3 me-3'} to={item.path}>
                        {item.caption}
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
