import React from 'react';
import Square from './square';


export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            make_wall: false,
            remove_wall: false,
            click_wall: false,
            
        }

        this.handle_mouse_up = this.handle_mouse_up.bind(this);
        this.handle_mouse_down = this.handle_mouse_down.bind(this);
        this.change_click_state = this.change_click_state.bind(this);
        this.sleep = this.sleep.bind(this);
    }
    sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    async handle_mouse_down() {
        await this.sleep(0);
        if(this.state.click_wall) {
            this.setState({ remove_wall: true });
        }
        else {
            this.setState({ make_wall: true });
        }
    }

    handle_mouse_up() {
        this.setState({ make_wall: false, remove_wall: false });
    }
    change_click_state(is_wall) {
        if(is_wall) {
            this.setState({ click_wall: true });
        }
        else {
            this.setState({ click_wall: false });
        }
    }

    render() {
        let render_arr = [];
        for(let i=0; i<1300; i++) {
            render_arr.push(<Square key={i} 
                tile={this.props.board.grid[i / 50 | 0][i % 50]}
                make_wall={this.state.make_wall}
                change={this.change_click_state}
                remove_wall={this.state.remove_wall}/>);
        }
        return (
            <div className="grid" onMouseDown={this.handle_mouse_down} onMouseUp={this.handle_mouse_up}>
                {render_arr}
            </div>
        )
    }
}