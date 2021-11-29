import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import * as routes from './routes';
import PageNotFound from '../components/common/Errors/PageNotFound';

const Routes: React.FC = () => {
    return (
        <Switch>
            {Object.keys(routes).map((key) => {
                const { component: Component, ...rest } = (routes as any)[key];
                return (
                    <Route
                        key={key}
                        {...rest}
                        render={(props) => (
                            <>
                                <Breadcrumbs {...props} />
                                <Component {...props} />
                            </>
                        )}
                    />
                );
            })}
            <Route key={'page-not-found'} component={PageNotFound} />
        </Switch>
    );
};

export default Routes;
