import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';
import "./Statistics.css";

class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.start,
            time: 0,
            totalWords: 0,
            fillerWords: 0
        };

        this.startTimer = this.startTimer.bind(this);

        if (this.state.start) {
            this.startTimer();
        }
    }

    startTimer() {
        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.start) {
            this.timer = setInterval(() => this.setState({
                time: this.state.time + 1
            }), 1)
        } else {
            this.state.time = 0;
        }
    }
      

    render() {
        const titles = ["Timer", "Word Count", "Words per Minute", "Filler World Count", "Sound Level"];

        const items = [];

        const timeInSeconds = Math.round(this.state.time/400);
        const wordsPerMinute = Math.round(this.state.totalWords/(this.state.time/60));

        var data = [timeInSeconds, this.state.totalWords, wordsPerMinute, this.state.fillerWords, 16]

        for (const [index, value] of titles.entries()) {
          items.push(<StatisticsBox title={ value } data={ data[index] } />)
        }
      
      
        return (
            <div className="Statistics">
                { items }
            </div>
        );
    }
}

export default Statistics;