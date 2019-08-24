import React, { Component } from 'react';
import StatisticsBox from './StatisticsBox';

class Statistics extends Component {
    render() {
        return (
            <div>
                <StatisticsBox />
                <StatisticsBox />
            </div>
        );
    }
}

export default Statistics;