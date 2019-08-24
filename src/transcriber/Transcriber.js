import React, { Component } from "react";
import CTA from './cta/CTA';
import Statistics from './statistics/Statistics'
import TextandFeedback from "./textandfeedback/TextandFeedback";

export default class Transcriber extends Component {

    constructor() {
        super();

        this.state = {
            title: 'Transcriber'
        };
    }

    render() {
        return(
            <div>
                <div><CTA /></div>
                <div><Statistics /></div>
                <div><TextandFeedback /></div>
            </div>
        );
    }

}