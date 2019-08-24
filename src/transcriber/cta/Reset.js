import React, { Component } from 'react';
import "./CTA.css"
import Button from '@material-ui/core/Button';
import Autorenew from '@material-ui/icons/Autorenew';

export default class IconLabelButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="default" onClick={ this.props.ResetClick }> 
                <Autorenew className="leftIcon" />
                    Reset
                </Button>
            </div>
        );    
    }
}