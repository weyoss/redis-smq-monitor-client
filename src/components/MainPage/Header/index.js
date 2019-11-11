'use strict';

import React from 'react';
import { Header as SemanticHeader} from "semantic-ui-react";


import './Header.css';
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

export const Header = props => {
    return (
        <SemanticHeader size={'huge'}>
            RedisSMQ Monitor
            <HeaderSubHeader>
                A monitoring tool for RedisSMQ message queue
            </HeaderSubHeader>
        </SemanticHeader>
    );
};