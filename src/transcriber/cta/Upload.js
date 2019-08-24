import React, { Component } from 'react';
import "./CTA.css"
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default class IconLabelButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="default">
                <CloudUploadIcon className="leftIcon" />
                Upload
                </Button>
            </div>
        );        
    }
}