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
    const path = basePath !== '/' ? basePath.replace(/\/+$/, '') : undefined;
    return (
        <BrowserRouter basename={path}>
            <Page {...props} />
        </BrowserRouter>
    );
};

export default AppPage;
