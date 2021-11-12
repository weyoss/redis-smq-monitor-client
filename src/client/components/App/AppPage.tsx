import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueueListing from '../QueueList';
import { AppPropsInterface } from './contract';
import { Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Content: React.FC<AppPropsInterface> = ({ stateLoading }) => {
    if (stateLoading) {
        return <Spinner animation="border" />;
    }
    return <Routes />;
};

const PageContent: React.FC<AppPropsInterface> = (props) => {
    const { loading } = props;
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    return (
        <>
            <Header />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <QueueListing />
                </div>
                <div className={'page'}>
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
