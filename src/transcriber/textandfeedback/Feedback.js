import React, { Component } from 'react';
import FeedbackCard from "./FeedbackCard";

class Feedback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <FeedbackCard />
            </div>
        );
    }
}

export default Feedback;