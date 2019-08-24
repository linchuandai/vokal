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
                <div className="button">
                <PlayPause PlayPauseClick={ this.props.PlayPauseClick }/>
                </div>
                <div className="button">
                <Reset />
                </div>
                <div className="button">
                <Upload />
                </div>
            </div>
        );
    }
}

export default CTA;