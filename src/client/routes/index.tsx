import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Routes() {
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
        </Switch>
    );
}
