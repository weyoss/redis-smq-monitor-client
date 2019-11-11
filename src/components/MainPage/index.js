'use strict';

import { hot } from 'react-hot-loader/root';

import '../../lib/semantic-ui-css/semantic.css'
import './MainPage.css';

import React from 'react';
import {websocket} from "../../websocket";

import {Header} from "./Header";
import {Overview} from "../Overview";
import {Queues} from "../Queues";
import {Footer} from "./Footer";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeline: new Array(60).fill({
                "processing": 0,
                "acknowledged": 0,
                "unacknowledged": 0,
                "input": 0,
            }),
            rates: {
                "processing": 0,
                "acknowledged": 0,
                "unacknowledged": 0,
                "input": 0,
            },
            queues: {}
        };
    }

    componentDidMount() {
        const {subscribeToStats} = websocket();
        subscribeToStats((stats) => {
            const timeline = this.state.timeline;
            timeline.push({...stats.rates});
            timeline.shift();
            this.setState(() => {
                return {
                    timeline,
                    ...stats,
                }
            });
        });
    }

    render() {
        return (
            <div className={'MainPage'}>
                <div className={'padding'}>
                    <div className={'wrapper'}>
                        <Header/>
                        <Overview timeline={this.state.timeline} rates={this.state.rates} />
                        <Queues queues={this.state.queues} />
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }

}

export default hot(MainPage);
