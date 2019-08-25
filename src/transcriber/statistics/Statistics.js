import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';
import "./Statistics.css";

class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.start,
            time: 0,
            totalWords: this.props.numWords,
            fillerWords: 0,
            startTime: new Date()
        };

        if (this.state.start) {
            this.startTimer();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            console.log('tick')
            this.setState({
                time: this.state.time + 300
            })
        }, 300)
    }

    componentDidMount(prevProps) {
        if (this.props.start) {
            this.startTimer();
        } else {
            this.setState({
                time: 0
            })
            clearInterval(this.timer)
        }
        this.setState({ numWords: this.props.numWords })
    }


    render() {
        const titles = ["Timer", "Word Count", "Words per Minute", "Filler Word Count", "Sound Level"];

        const items = [];

        const timeInSeconds = Math.round((new Date() - this.state.startTime));
        const wordsPerMinute = Math.round(this.state.totalWords / (this.state.time / 60)) || 0;

        var data = [timeInSeconds, this.state.totalWords, wordsPerMinute, this.state.fillerWords, 0]

        for (const [index, value] of titles.entries()) {
            items.push(<StatisticsBox title={value} data={data[index]} />)
        }


        return (
            <div className="Statistics">
                {items}
            </div>
        );
    }
}

export default Statistics;