import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueueListing from '../QueueList';
import { AppPropsInterface } from './contract';
import Spinner from '../Spinner';
import HomeLink from '../HomeLink';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Content: React.FC<AppPropsInterface> = ({ stateLoading }) => {
    if (stateLoading) {
        return <Spinner loading={stateLoading} />;
    }
    return <Routes />;
};

const PageContent: React.FC<AppPropsInterface> = (props) => {
    const { loading } = props;
    if (loading) {
        return <Spinner loading={loading} />;
    }
    return (
        <>
            <Header />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <QueueListing />
                </div>
                <div className={'page'}>
                    <HomeLink />
                    <Content {...props} />
                </div>
            </div>
            <Footer />
        </>
    );
};

const AppPage: React.FC<AppPropsInterface> = (props) => {
    return (
        <BrowserRouter>
            <PageContent {...props} />
        </BrowserRouter>
    );
};

export default AppPage;
