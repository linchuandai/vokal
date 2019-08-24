import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';
import "./Statistics.css";


class Statistics extends Component {
    render() {
        return (
            <div className="Statistics">
                <StatisticsBox />
                <StatisticsBox />
            </div>
        );
    }
}

export default Statistics;