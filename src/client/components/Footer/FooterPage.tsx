import React from 'react';
import { FooterPropsInterface } from './contract';

import './style.css';

const FooterPage: React.FC<FooterPropsInterface> = ({ version, license }) => (
    <footer>
        {`RedisSMQ Monitor v${version}`}
        <br />
        &copy; Weyoss 2017 - 2021. Licensed under {license}.
    </footer>
);

export default FooterPage;
