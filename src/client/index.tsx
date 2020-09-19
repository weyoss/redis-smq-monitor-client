import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import App from './components/App';

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('app')
);
