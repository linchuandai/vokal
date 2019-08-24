import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';
import "./Statistics.css";


class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            totalWords: 570,
            fillerWords: 3
        };

        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }), 10)
    }

    render() {
        const titles = ["Timer", "Word Count", "Words per Minute", "Filler World Count", "Sound Level"]

        const items = []
        var data = [this.state.time, this.state.totalWords, Math.round(this.state.totalWords/(this.state.time/3600)), this.state.fillerWords, 16]

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