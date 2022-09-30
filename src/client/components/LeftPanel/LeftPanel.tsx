import Logo from './Logo/Logo';
import QueuesPanelMenu from './Queues/Queues';
import Scheduled from './Scheduled/Scheduled';
import React from 'react';

export const LeftPanel = () => {
    return (
        <div className={'leftPanel'}>
            <Logo />
            <QueuesPanelMenu />
            <Scheduled />
        </div>
    )
}