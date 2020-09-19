import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ErrorBoundary from '../ErrorBoundary';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueueLabels from '../QueueLabels';
import { AppPropsInterface } from './contract';
import Spinner from '../Spinner';
import HomeLink from '../HomeLink';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const PageContent = ({ loading }: { loading: boolean }) => {
    if (loading) {
        return <Spinner loading={loading} />;
    }
    return (
        <>
            <Header />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <QueueLabels />
                </div>
                <div className={'page'}>
                    <HomeLink />
                    <Routes />
                </div>
            </div>
            <Footer />
        </>
    );
};

const AppPage: React.FC<AppPropsInterface> = ({ loading }) => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <PageContent loading={loading} />
            </BrowserRouter>
        </ErrorBoundary>
    );
};

export default AppPage;
