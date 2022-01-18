// polyfill (needed to fix matchMedia for safari < 14)
// See https://github.com/leeoniya/uPlot/issues/538
import './polyfill/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import App from './components/App';
import ErrorBoundary from './components/common/ErrorBoundary';

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </ReduxProvider>,
    document.getElementById('app')
);
export { TGetPendingMessagesWithPriorityHTTPResponse } from './transport/http/api';
export { TGetScheduledMessagesHTTPResponse } from './transport/http/api';
export { TGetQueueMessagesHTTPResponse } from './transport/http/api';
export { TPaginatedHTTPResponse } from './transport/http/api';
