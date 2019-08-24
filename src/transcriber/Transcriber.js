import React, { Component } from "react";
import CTA from './cta/CTA';
import Statistics from './statistics/Statistics'
import TextandFeedback from "./textandfeedback/TextandFeedback";
import "./Transcriber.css"

export default class Transcriber extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Transcriber',
        };
    }

    render() {
        return(
            <div className="Transcriber">
                <div class="PresentationTitle">Hack the 6ix Presentation</div>
                <div><CTA /></div>
                <div><Statistics/></div>
                <div><TextandFeedback /></div>
            </div>
        );
    }

}