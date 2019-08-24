import React, { Component } from "react";
import TexttoSpeech from "./TexttoSpeech";
import Feedback from './Feedback';
import "./TextandFeedback.css";

class TextandFeedback extends Component {
    render() {
        return (
            <div className="TextandFeedback">
                <div className="TexttoSpeech">
                    <div className="HeaderText">Transcription</div>
                    <TexttoSpeech />
                </div>
                <div className="Feedback">
                    <div className="HeaderText">Analysis</div>
                    <Feedback />
                </div>
            </div>
        
        );
    }
}

export default TextandFeedback;