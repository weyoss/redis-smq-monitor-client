import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </ReduxProvider>,
    document.getElementById('app')
);
