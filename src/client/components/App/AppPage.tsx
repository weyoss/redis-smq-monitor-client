import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import React from 'react';
import Logo from '../common/Logo/Logo';
import Footer from '../common/Footer/Footer';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';
import QueuesPanelMenu from '../QueuesPanelBox/QueuesPanelBox';
import { Spinner } from 'react-bootstrap';
import { INotificationsState } from '../../store/notifications/state';
import Notification from '../common/Notification';
import SchedulerPanelBox from '../ScheduledPanelBox/ScheduledPanelBox';
import { EWebsocketMainStreamStatus, IWebsocketMainStreamState } from '../../store/websocket-main-stream/state';

interface IProps {
    websocketMainStreamState: IWebsocketMainStreamState;
    notificationsState: INotificationsState;
}

const Page: React.FC<IProps> = (props) => {
    const { websocketMainStreamState, notificationsState } = props;
    const { status } = websocketMainStreamState;
    if (status === EWebsocketMainStreamStatus.INIT) {
        return (<>
            <span className={'me-2'}>Initializing...</span>
            <Spinner animation={'border'} />
        </>);
    }
    if (status === EWebsocketMainStreamStatus.LOADING) {
        return (<>
            <span className={'me-2'}>Waiting for upstream data... </span>
            <Spinner animation={'border'} />
        </>);
    }
    return (
        <>
            <Notification stack={notificationsState.stack} />
            <div className="mainContainer">
                <div className={'sidePanel'}>
                    <Logo />
                    <QueuesPanelMenu />
                    <SchedulerPanelBox />
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
