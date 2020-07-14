import React from 'react';
import GraphSidebar from './graph_sidebar';
import Grid from './grid';
import Board from '../vanillaJS/board';

export default class GraphDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            algo: "bfs",
            board: new Board(),
            start: [10, 10],
            target: [10, 20]
        }
        this.set_algo = this.set_algo.bind(this);
        this.search = this.search.bind(this);
        this.bfs = this.bfs.bind(this);
        this.surr_squares = this.surr_squares.bind(this);
        this.sleep = this.sleep.bind(this);
    }

    componentDidMount() {
        this.state.board.grid[10][10].start = true;
        this.state.board.grid[10][20].target = true;
        this.setState({ board: this.state.board });
    }

    sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    set_algo(algo) {
        this.setState({ algo: algo });
    }

    search() {
        switch(this.state.algo) {
            case "bfs":
                this.bfs();
                break;
            default:
                break;
        }
    }

    async bfs() {
        let start = this.state.start;
        let queue = [this.state.board.grid[start[0]][start[1]]];
        let found = false;
        console.log("searching");
        while(!found) {
            let curr_sq = queue.shift();
            if(curr_sq.searched) {
                continue;
            }
            if(curr_sq.target) {
                found = true;
                break;
            }
            else {
                this.surr_squares(curr_sq.pos).forEach( sq => {
                    if(!sq.searched) {
                        queue.push(sq);
                    }
                });
            }
            curr_sq.searched = true;
            
            this.setState({ board: this.state.board });
            await this.sleep(0);
        }
    }

    surr_squares(pos) {
        let DIRS = [[0,1],[1,0],[0,-1],[-1,0]];
        let squares = [];
        DIRS.forEach( dir => {
            let new_pos = [dir[0] + pos[0], dir[1] + pos[1]];
            if(new_pos[0] >= 0 && new_pos[0] < 26 && new_pos[1] >= 0 && new_pos[1] < 50) {
                squares.push(this.state.board.grid[new_pos[0]][new_pos[1]]);
            }
        });
        return squares;
    } 

    render() {
        return (
            <div>
                <Grid board={this.state.board} algo={this.state.algo} />
                <GraphSidebar set_algo={this.set_algo} search={this.search} />
            </div>
        )
    }
}