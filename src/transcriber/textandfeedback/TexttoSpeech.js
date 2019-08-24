import React, { Component } from 'react';

var transcribedText = "This is the component for transcribed text. Yes it is";

class TexttoSpeech extends Component {

    constructor(props) {
        super();

        this.state = {
            transcribedText: transcribedText
        };
    }

    render() {
        return (
            <p>{ this.state.transcribedText }</p>

        );
    }
}

export default TexttoSpeech;