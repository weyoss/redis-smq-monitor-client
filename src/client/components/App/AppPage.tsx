import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import React from 'react';
import Logo from '../common/Logo';
import Footer from '../common/Footer';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueuesPanelMenu from '../QueuesPanelMenu';
import { Spinner } from 'react-bootstrap';
import { INotificationsState } from '../../store/notifications/state';
import Notification from '../common/Notification/Notification';
import SchedulerPanelMenu from '../ScheduledPanelMenu';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';
import { BASE_PATH } from '../../transport/endpoints';

interface IProps {
    websocketMainStreamState: IWebsocketMainStreamState;
    notificationsState: INotificationsState;
}

const Page: React.FC<IProps> = (props) => {
    const { websocketMainStreamState, notificationsState } = props;
    const { loading } = websocketMainStreamState;
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    return (
        <>
            <Notification stack={notificationsState.stack} />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <Logo />
                    <QueuesPanelMenu />
                    <SchedulerPanelMenu />
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
        <BrowserRouter basename={BASE_PATH}>
            <Page {...props} />
        </BrowserRouter>
    );
};

export default AppPage;
