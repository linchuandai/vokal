import React, { Component } from 'react';
import "./CTA.css"
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/Pause';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';


export default class IconLabelButtons extends Component {

    constructor(props) {
        super(props);

        this.setState({ start: false })
    }

    buttonImage() {
        if (this.state.start) {
            this.setState({ start: false })
            return(
                <div><Pause className="leftIcon" />Pause</div>
            );
        } else {
            this.setState({ start: true })
            return(
                <div><Pause className="leftIcon" />Pause</div>
            );
        }
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="default" className="button" onClick={ this.props.PlayPauseClick }>
                <Pause className="leftIcon" />Pause
                </Button>

            </div>
      );
    
    }
}
