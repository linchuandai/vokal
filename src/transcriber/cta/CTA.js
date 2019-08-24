import React, { Component } from 'react';
import PlayPause from "./PlayPause";
import Reset from "./Reset";
import Upload from "./Upload";
import "./CTA.css"

class CTA extends Component {
    render() {
        return (
            <div className="CTA">
                <PlayPause />
                <Reset />
                <Upload />
            </div>
        );
    }
}

export default CTA;