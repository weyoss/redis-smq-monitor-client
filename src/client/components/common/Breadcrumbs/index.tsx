import React from 'react';
import routes from '../../../routes/routes';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

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
    const crumbs = Object.values(routes)
        .filter(({ path }: RouteProps) => typeof path === 'string' && relative(match.path, path))
        .map(({ path, ...rest }: RouteProps) => ({
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
            {crumbs.map((item: any, index) => (
                <span key={index}>
                    <span>/</span>
                    <Link className={'ms-3 me-3'} to={item.path}>
                        {item.name}
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
