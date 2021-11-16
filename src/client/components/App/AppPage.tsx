import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueueListing from '../QueueList';
import { Spinner } from 'react-bootstrap';
import { IModalState } from '../../store/modal/state';
import { IStatsState } from '../../store/stats/state';
import Modal from '../common/Modal/Modal';
import { INotificationsState } from '../../store/notifications/state';
import Notification from '../common/Notification/Notification';
import Scheduler from '../Scheduler';

interface IProps {
    statsState: IStatsState;
    modalState: IModalState;
    notificationsState: INotificationsState;
}

const Page: React.FC<IProps> = (props) => {
    const { statsState, modalState, notificationsState } = props;
    const { loading } = statsState;
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    return (
        <>
            <Header />
            <Modal
                title={modalState.title}
                body={modalState.body}
                onConfirmation={modalState.onConfirmation}
                onCancel={modalState.onCancel}
                show={modalState.show}
            />
            <Notification stack={notificationsState.stack} />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <QueueListing />
                    <Scheduler />
                </div>
                <div className={'page'}>
                    <Routes />
                </div>
            </div>
            <Footer />
        </>
    );
};

const AppPage: React.FC<IProps> = (props) => {
    return (
        <BrowserRouter>
            <Page {...props} />
        </BrowserRouter>
    );
};

export default AppPage;
