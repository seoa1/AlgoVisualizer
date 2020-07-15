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
            target: [10, 20],
            searching: false,
            stop: false,
            reset: false
        }
        this.set_algo = this.set_algo.bind(this);
        this.search = this.search.bind(this);
        this.bfs = this.bfs.bind(this);
        this.surr_squares = this.surr_squares.bind(this);
        this.sleep = this.sleep.bind(this);
        this.dfs = this.dfs.bind(this);
        this.reset_all = this.reset_all.bind(this);
        this.reset_searched = this.reset_searched.bind(this);
        this.update_board = this.update_board.bind(this);
    }

    update_board() {
        this.setState({ board: this.state.board });
    }

    async reset_all() {
        await this.setState({ stop: true, reset: true });
        this.state.board = new Board();
        this.state.board.grid[this.state.start[0]][this.state.start[1]].start = true;
        this.state.board.grid[this.state.target[0]][this.state.target[1]].target = true;
        this.setState({ board: this.state.board, reset: false });
    }

    reset_searched() {
        for(let i=0; i<26; i++) {
            for(let j=0; j<50; j++) {
                this.state.board.grid[i][j].searched = false;
            }
        }
        this.setState({ board: this.state.board });
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

    async search() {
        await this.setState({ stop: false });
        if(this.state.searching) {
            this.setState({ stop: true, searching: false });
            return;
        }
        await this.reset_searched();
        this.setState({ searching: true });
        console.log("triggered");
        switch(this.state.algo) {
            case "bfs":
                await this.bfs();
                break;
            case "dfs":
                await this.dfs(this.state.board.grid[10][10]);
                break;
            default:
                break;
        }
        this.setState({ searching: false });
    }

    async bfs() {
        let start = this.state.start;
        let start_sq = this.state.board.grid[start[0]][start[1]];
        let queue = [start_sq];
        let seen = new Set([start_sq.id]);
        let found = false;
        console.log("searching");
        while(!found) {
            if(this.state.stop) {
                return;
            }
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
                    if(!sq.searched && !sq.wall && !seen.has(sq.id)) {
                        queue.push(sq);
                        seen.add(sq.id);
                    }
                });
            }
            curr_sq.searched = true;
            
            this.setState({ board: this.state.board });
            await this.sleep(0);
            
        }
    }

    async dfs() {
        let start = this.state.start;
        let start_sq = this.state.board.grid[start[0]][start[1]];
        let stack = [start_sq];
        let found = false;
        while(!found) {
            if(this.state.stop) {
                return;
            }
            let curr_sq = stack.pop();
            if(curr_sq.searched) {
                continue;
            }
            if(curr_sq.target) {
                found = true;
                break;
            }
            else {
                this.surr_squares(curr_sq.pos).forEach( sq => {
                    if(!sq.searched && !sq.wall) {
                        stack.push(sq);
                    }
                })
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
                <Grid searching={this.state.searching} board={this.state.board} algo={this.state.algo} reset={this.state.reset}/>
                <GraphSidebar reset_all={this.reset_all} searching={this.state.searching} set_algo={this.set_algo} search={this.search} />
            </div>
        )
    }
}