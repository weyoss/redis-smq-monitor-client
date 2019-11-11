'use strict';

import React from 'react';
import {version} from '../../../../package.json';
import {Container, Divider} from "semantic-ui-react";

import './Footer.css'

export const Footer = props => {
    return (
        <div className={'Footer'}>
            <p>RedisSMQ Monitor v{version}</p>
        </div>
    );
};