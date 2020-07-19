import React from 'react';


export default class Speed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 1
        }
        this.handle_click_1 = this.handle_click_1.bind(this);
        this.handle_click_2 = this.handle_click_2.bind(this);
        this.handle_click_4 = this.handle_click_4.bind(this);
    }
    handle_click_1() {
        this.props.change_time(1);
        this.setState({ clicked: 1});
    }
    handle_click_2() {
        this.props.change_time(2);
        this.setState({ clicked: 2});

    }
    handle_click_4() {
        this.props.change_time(4);
        this.setState({ clicked: 3});

    }

    render() {
        return (
            <div className="speed">
                <div>Speed</div>
                <div className={"speedbutton speed1" + (this.state.clicked === 1 ? " speedselect1": "")} onClick={this.handle_click_1}>Normal</div>
                <div className={"speedbutton speed2" + (this.state.clicked === 2 ? " speedselect2": "")} onClick={this.handle_click_2}>Fast</div>
                <div className={"speedbutton speed3" + (this.state.clicked === 3 ? " speedselect3": "")} onClick={this.handle_click_4}>Fastest</div>
            </div>
        )
    }
}