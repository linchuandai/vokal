import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';
import "./Statistics.css";

class Statistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: this.props.start,
            time: 0,
            totalWords: this.props.totalWords,
            fillerWords: 0
        };

        this.isUpdating = false;
        this.timerRunning = false;
        
        if (this.state.start) {
            this.startTimer();
        }
    }

    startTimer() {
        // this.state.startTime = new Date();
        console.log('outside interval', this)
        this.setState({
            time: 0
        })
        this.timer = setInterval(() => {
            this.isUpdating = false
            this.setState({
                time: this.state.time + 300
            })
        }, 300)
    }
/*
    componentDidMount(prevProps) {
        console.log('did mount', this.props)
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
*/
    componentDidUpdate(prevProps) {
        if (!this.isUpdating) {
            this.isUpdating = true;
            console.log('did mount', this.props)
            if (this.props.start && !this.timerRunning) {
                this.timerRunning = true;
                this.startTimer();
            } else if (!this.props.start) {
                this.timerRunning = true;
                clearInterval(this.timer)
            }
            console.log(this.state)
            this.setState({ totalWords: this.props.totalWords })
        }
    }



    render() {
        const titles = ["Timer", "Word Count", "Words per Minute", "Filler Word Count", "Sound Level"];

        const items = [];

        const timeInSeconds = Math.round(this.state.time/1000);
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