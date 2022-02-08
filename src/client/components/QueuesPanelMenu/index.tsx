import React, { useCallback } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import QueuesPanelMenuPage from './QueuesPanelMenuPage';
import { IStoreState } from '../../store/state';
import useSelector from '../../hooks/useSelector';
import { matchRoute } from '../../routes/common';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';
import { addNotificationAction } from '../../store/notifications/action';
import { ENotificationType } from '../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { deleteNamespace } from '../../transport/http/api';

const QueuesPanelMenu: React.FC<RouteComponentProps> = (props) => {
    const { payload, loading } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const deleteNamespaceRequestCallback = useCallback((ns: string) => () => deleteNamespace(ns), [payload]);
    const deleteNamespaceRequestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Namespace has been successfully deleted.`, ENotificationType.SUCCESS));
        history.push(`/`);
    }, [payload]);
    // This component is not a child of the Router, so we can not access current route parameters.
    // This is a workaround to get the parameters.
    const match = matchRoute(props.location.pathname);
    const params = match?.params ?? {};
    return (
        <QueuesPanelMenuPage
            deleteNamespaceRequestCallback={deleteNamespaceRequestCallback}
            deleteNamespaceRequestSuccessCallback={deleteNamespaceRequestSuccessCallback}
            websocketMainStreamPayload={payload}
            matchedQueueParams={params}
            loading={loading}
        />
    );
};

export default withRouter(QueuesPanelMenu);
