import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wall: false
        }
        this.handle_mouse_over = this.handle_mouse_over.bind(this);
        this.handle_click = this.handle_click.bind(this);
        this.sleep = this.sleep.bind(this);
    }
    sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }
    handle_mouse_over() {
        if(this.props.make_wall) {
            this.setState({ wall: true });
        }
        if(this.props.remove_wall) {
            this.setState({ wall: false });
        }
    }

    async handle_click() {
        await this.props.change(this.state.wall);
        if(this.state.wall) {
            this.setState({ wall: false });
        }
        else {
            this.setState({ wall: true });
        }
    }

    render() {
        let add_class = "";
        if(this.state.wall) {
            add_class += " wall";
        }
        return( 
            <div className={`square${add_class}`} onMouseDown={this.handle_click} onMouseOver={this.handle_mouse_over}>

            </div>
        )
    }
}