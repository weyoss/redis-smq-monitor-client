import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../components/Errors/PageNotFound';
import Queue from '../components/Queue';
import Overview from '../components/Overview';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/ns/:ns/qn/:qn" component={Queue} />
            <Route component={PageNotFound} />
        </Switch>
    );
}
