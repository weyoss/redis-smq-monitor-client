import React from 'react';
import routes from '../../routes/routes';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

const Breadcrumbs: React.FC<RouteComponentProps> = ({ match }) => {
    const crumbs = Object.values(routes)
        .filter(({ path }: RouteProps) => match.path.includes(path as string))
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
                    <Link className={'ml-3 mr-3'} to={item.path}>
                        {item.name}
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
