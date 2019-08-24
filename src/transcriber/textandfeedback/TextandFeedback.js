import React, { Component } from "react";
import TexttoSpeech from "./TexttoSpeech";
import Feedback from './Feedback';
import "./TextandFeedback.css";

class TextandFeedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transcribedText: this.props.transcribedText
        }
    }

    componentDidUpdate(prevProps) {
        try {
            if (this.props.transcribedText != this.state.transcribedText ) {
                this.setState({ transcribedText: this.props.transcribedText });
            }    
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="TextandFeedback">
                <div className="TexttoSpeech">
                    <div className="HeaderText">Transcription</div>
                    <TexttoSpeech transcribedText={ this.state.transcribedText }/>
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