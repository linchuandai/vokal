import React, { Component } from "react";
import CTA from './cta/CTA';
import Statistics from './statistics/Statistics'
import TextandFeedback from "./textandfeedback/TextandFeedback";
import "./Transcriber.css"

// functions to do the CTAs and AWS API calls 

export default class Transcriber extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: true
        };
    }

    render() {
        return(
            <div className="Transcriber">
                <div class="PresentationTitle">Hack the 6ix Presentation</div>
                <div><CTA /></div>
                <div><Statistics start={ this.state.start }/></div>
                <div><TextandFeedback /></div>
            </div>
        );
    }

}