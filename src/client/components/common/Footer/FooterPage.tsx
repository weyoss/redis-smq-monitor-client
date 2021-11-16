import './style.css';
import React from 'react';

interface IProps {
    version: string;
    license: string;
}

const FooterPage: React.FC<IProps> = ({ version, license }) => (
    <footer>
        {`RedisSMQ Monitor v${version}`}
        <br />
        &copy;{' '}
        <a target={'_blank'} href={'https://github.com/weyoss'}>
            Weyoss
        </a>{' '}
        2017 - {new Date().getFullYear()}. Licensed under{' '}
        <a target={'_blank'} href={'https://github.com/weyoss/redis-smq-monitor/blob/master/LICENSE'}>
            {license}
        </a>
        .
    </footer>
);

export default FooterPage;
