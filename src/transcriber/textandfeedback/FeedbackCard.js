import React, { Component } from 'react';
import "./FeedbackCard.css";

class FeedbackCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

        this.hoverOff = this.hoverOff.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
    }

    hoverOn() {
        this.setState({ hover: true });
    }
    
    hoverOff(){ 
        this.setState({ hover: false });    
    }      

    render() {
        return (
            <div className={ this.state.hover ? "Test" : "FeedbackCard"} onMouseEnter={ this.hoverOn } onMouseLeave={ this.hoverOff } >
                <p1>Filter Word</p1>
                <p1>Occured at 1:40</p1>
            </div>
        );
    }
}

export default FeedbackCard;