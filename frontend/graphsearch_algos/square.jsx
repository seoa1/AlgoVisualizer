import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        // tile = this.props.tile
        this.state = {
            wall: false
        }
        this.handle_mouse_over = this.handle_mouse_over.bind(this);
        this.handle_click = this.handle_click.bind(this);
        this.sleep = this.sleep.bind(this);
    }

    UNSAFE_componentWillUpdate() {
        if(this.state.wall && this.props.reset) {
            this.setState({wall: false});
        }
    }
    sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }
    handle_mouse_over() {
        if(this.props.make_wall && !this.props.searching) {
            this.setState({ wall: true });
            this.props.tile.wall = true;
        }
        if(this.props.remove_wall && !this.props.searching) {
            this.setState({ wall: false });
            this.props.tile.wall = false;
        }
    }

    async handle_click() {
        await this.props.change(this.state.wall);
        if(this.state.wall && !this.props.searching) {
            this.setState({ wall: false });
            this.props.tile.wall = false;
        }
        else if(!this.props.searching){
            this.setState({ wall: true });
            this.props.tile.wall = true;
        }
    }

    render() {
        let add_class = "";
        if(this.state.wall) {
            add_class += " wall";
        }
        if(this.props.tile.start) {
            add_class += " start";
        }
        else if(this.props.tile.target) {
            add_class += " target";
        }
        else if(this.props.tile.ispath) {
            add_class += " path";
        }
        else if(this.props.tile.searched) {
            add_class += " searched";
        }
        return( 
            <div className={`square${add_class}`} onMouseDown={this.handle_click} onMouseOver={this.handle_mouse_over}>

            </div>
        )
    }
}