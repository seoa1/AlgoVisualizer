import React from 'react';
import Dropdown from './algo_dropdown';

export default class Picker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handle_click = this.handle_click.bind(this);
    }

    handle_click() {
        if(this.state.show) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }
    }

    render() {
        let algo_out = "";
        switch(this.props.algo) {
            case "dfs":
                algo_out = "DFS";
                break;
            case "bfs":
                algo_out = "BFS";
                break;
            case "djikstra":
                algo_out = "Djikstra's";
                break;
            case "astar":
                algo_out = "A*";
                break;
            default:
                break;
        }
        return (
            <div>
                <div className="pickme">Pick an Algorithm!</div>
                <div className="picker" onClick={this.handle_click}>
                    {algo_out}
                    <div className="shower" >
                        {this.state.show ? 
                        <img className="up" src="./images/up_arrow.png"/> :
                        <img className="down" src="./images/down_arrow.png"/>}
                    </div>
                    {this.state.show ? <Dropdown set_algo={this.props.set_algo}/> : null}
                </div>
            </div>
            
        )
    }
}

