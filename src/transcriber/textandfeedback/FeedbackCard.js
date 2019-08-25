import React, { Component } from 'react';
import "./FeedbackCard.css";

class FeedbackCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            filterWordFound: this.props.filterWordFound
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
                <p1>Filler Word { this.state.filterWordFound }</p1>
            </div>
        );
    }
}

export default FeedbackCard;