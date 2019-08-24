import React, { Component } from 'react';
import PlayPause from "./PlayPause";
import Reset from "./Reset";
import Upload from "./Upload";
import "./CTA.css"

class CTA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CTA">
                <PlayPause PlayPauseClick={ this.props.PlayPauseClick }/>
                <Reset />
                <Upload />
            </div>
        );
    }
}

export default CTA;