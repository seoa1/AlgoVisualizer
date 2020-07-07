import React from 'react';
import Dropdown from './algo_dropdown';

export default class AlgoPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.click_dropdown = this.click_dropdown.bind(this);
    }

    click_dropdown() {
        if(this.state.show) {
            this.setState({ show: false })
        }
        else {
            this.setState({ show: true });
        }
    }


    render() {
        let algo_out;
        switch (this.props.algo) {
            case "select":
                algo_out = "Selection Sort";
                break;
            case "bubble":
                algo_out = "Bubble Sort";
                break;
            case "insert":
                algo_out = "Insertion Sort";
                break;
            default:
                algo_out = "Algo not found";
                break;
        }
        let shower;
        if(this.state.show) {
            shower = "HIDE";
        }
        else {
            shower = "SHOW";
        }
        return (
            <div>
                <div>{algo_out}</div>
                <div onClick={this.click_dropdown}>{shower}</div>
                {this.state.show ? <Dropdown setalgo={this.props.setalgo}/> : null}
            </div>
        )
    }
}