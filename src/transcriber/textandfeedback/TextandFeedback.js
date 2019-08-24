import React, { Component } from "react";
import TexttoSpeech from "./TexttoSpeech";
import Feedback from './Feedback';
import PropTypes from 'prop-types';
import "./TextandFeedback.css";

class TextandFeedback extends Component {
    render() {
        return (
            <div className="TextandFeedback">
                <div className="TexttoSpeech"><TexttoSpeech /></div>
                <div className="Feedback"><Feedback /></div>
            </div>
        
        );
    }
}

export default TextandFeedback;