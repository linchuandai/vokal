import React, { Component } from 'react';
import FeedbackCard from "./FeedbackCard";

class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fillerWordsFound: this.props.fillerWordsFound
        }
    }

    componentDidUpdate(prevProps) {
        try {
            if (this.props.fillerWordsFound != prevProps.fillerWordsFound ) {
                this.setState({ fillerWordsFound: this.props.fillerWordsFound })
            }    
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        let items = [];

        for (const [index, value] of this.state.fillerWordsFound.entries()) {
            items.push(<FeedbackCard filterWordFound={value} />)
        }

        console.log(this.state.fillerWordsFound);

        return (
            <div>
                { items }
            </div>
        );
    }
}

export default Feedback;