import React, { Component } from 'react';

class TexttoSpeech extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transcribedText: this.props.transcribedText
        }
    }

    componentDidUpdate(prevProps) {
        try {
            if (this.props.transcribedText != this.prevProps.transcribedText ) {
                this.setState({ transcribedText: this.props.transcribedText })
            }    
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <p>{ this.state.transcribedText }</p>
        );
    }
}

export default TexttoSpeech;