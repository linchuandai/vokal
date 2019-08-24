import React, { Component } from "react";
import "./StatisticsBox.css";

class StatisticsBox extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div class="StatisticsBox">
                <div class="StatisticsTitle">{ this.props.title }</div>
                <div class="StatisticsData">{ this.props.data }</div>
            </div>
        );
    }

};


export default StatisticsBox;