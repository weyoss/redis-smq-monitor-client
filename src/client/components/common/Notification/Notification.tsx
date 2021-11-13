import React from 'react';
import { INotificationsState } from '../../../store/notifications/state';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeNotificationAction } from '../../../store/notifications/action';

const Notification: React.FC<INotificationsState> = (props) => {
    const { stack } = props;
    const dispatch = useDispatch();
    return (
        <>
            {stack.map((notification, idx) => (
                <Alert
                    key={idx}
                    variant={notification.type}
                    onClose={() => dispatch(closeNotificationAction(notification.id))}
                    dismissible
                >
                    {notification.text}
                </Alert>
            ))}{' '}
        </>
    );
};

export default Notification;
