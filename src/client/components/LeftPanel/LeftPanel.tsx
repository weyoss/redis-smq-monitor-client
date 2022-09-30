import Logo from './Logo/Logo';
import Queues from './Queues/Queues';
import Scheduled from './Scheduled/Scheduled';
import React from 'react';
import Exchanges from './Exchanges/Exchanges';

const LeftPanel = () => {
    return (
        <div className={'leftPanel'}>
            <Logo />
            <Queues />
            <Exchanges />
            <Scheduled />
        </div>
    )
}

export default LeftPanel;