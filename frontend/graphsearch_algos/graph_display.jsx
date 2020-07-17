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
            start: [12, 15],
            target: [12, 35],
            searching: false,
            stop: false,
            reset: false,
            width: 0,
            height: 0
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
        this.heapify = this.heapify.bind(this);
        this.djikstra = this.djikstra.bind(this);
        this.update_window_dims = this.update_window_dims.bind(this);
    }
    componentDidMount() {
        this.update_window_dims();
        window.addEventListener('resize', this.update_window_dims);

        this.state.board.grid[12][15].start = true;
        this.state.board.grid[12][35].target = true;
        this.setState({ board: this.state.board });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.update_window_dims);
    }

    update_window_dims() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    update_board() {
        this.setState({ board: this.state.board });
    }

    async reset_all() {
        await this.setState({ stop: true, reset: true });
        this.state.board = new Board();
        this.state.board.grid[this.state.start[0]][this.state.start[1]].start = true;
        this.state.board.grid[this.state.target[0]][this.state.target[1]].target = true;
        this.setState({ board: this.state.board, reset: false, searching: false });
    }

    reset_searched() {
        for(let i=0; i<26; i++) {
            for(let j=0; j<50; j++) {
                this.state.board.grid[i][j].searched = false;
                this.state.board.grid[i][j].ispath = false;
            }
        }
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
        switch(this.state.algo) {
            case "bfs":
                await this.bfs();
                break;
            case "dfs":
                await this.dfs(this.state.board.grid[10][10]);
                break;
            case "djikstra":
                await this.djikstra();
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
                        sq.parent = curr_sq;
                        seen.add(sq.id);
                    }
                });
            }
            curr_sq.searched = true;
            
            this.setState({ board: this.state.board });
            await this.sleep(0);
            
        }
        //path visualize
        let target_sq = this.state.board.grid[this.state.target[0]][this.state.target[1]];
        let temp = target_sq.parent;
        while(temp != null) {
            temp.ispath = true;
            this.setState({ board: this.state.board });
            await this.sleep(0);
            if(this.state.stop) {
                return;
            }
            temp = temp.parent;
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
                        sq.parent = curr_sq;
                    }
                })
            }
            curr_sq.searched = true;
            this.setState({ board: this.state.board });
            await this.sleep(0);
        }

        //path visualize
        let target_sq = this.state.board.grid[this.state.target[0]][this.state.target[1]];
        let temp = target_sq.parent;
        while(temp != null) {
            temp.ispath = true;
            this.setState({ board: this.state.board });
            await this.sleep(0);
            if(this.state.stop) {
                return;
            }
            temp = temp.parent;
        }
    }


    // min-heap djikstra not working
    heapify(arr, root, heap_search) {
        let smallest = root;
        let left = 2 * root + 1;
        let right = 2 * root + 2;
        if(left < arr.length && arr[left].pathlen < arr[smallest].pathlen) {
            smallest = left;
        }
        if(right < arr.length && arr[right].pathlen < arr[smallest].pathlen) {
            smallest = right;
        }
        if(smallest !== root) {
            heap_search.set(arr[smallest], root);
            heap_search.set(arr[root], smallest);
            let temp = arr[smallest];
            arr[smallest] = arr[root];
            arr[root] = temp;
            this.heapify(arr, smallest, heap_search);
        }
    }

    async djikstra() {
        let start_sq = this.state.board.grid[this.state.start[0]][this.state.start[1]];
        start_sq.pathlen = 0;
        let min_heap = [start_sq];
        let heap_search = new Map();
        heap_search.set(start_sq, 0);
        let idx = 1;
        this.state.board.grid.flat().forEach( sq => {
            if(sq.pathlen !== 0) {
                min_heap.push(sq);
                heap_search.set(sq, idx);
                idx++;
            }
        });
        let found = false;
        while(!found) {
            let temp = min_heap[0];
            min_heap[0] = min_heap[min_heap.length - 1];
            min_heap[min_heap.length - 1] = temp;

            let min_sq = min_heap.pop();
            heap_search.delete(min_sq);
            await this.heapify(min_heap, 0, heap_search);

            if(min_sq.target) {
                found = true;
                break;
            }

            min_sq.searched = true;

            this.surr_squares(min_sq.pos).forEach( surr_sq => {
                if(!surr_sq.searched && !surr_sq.wall){
                    let sq_idx = heap_search.get(surr_sq);
                    if(sq_idx < min_heap.length) {
                        console.log(min_heap[sq_idx].pos);
                        console.log(surr_sq.pos);
                        let bubbled = true;
                        let pot_pathlen = min_sq.pathlen + 1;
                        if(pot_pathlen < surr_sq.pathlen) {
                            surr_sq.pathlen = pot_pathlen;
                            bubbled = false;
                            surr_sq.parent = min_sq;
                        }
                        console.log(surr_sq.pathlen);
                        
                        // bubble up the heap
                        while(!bubbled) {
                            sq_idx = heap_search.get(surr_sq);
                            bubbled = true;
                            let parent_idx = ((sq_idx - 1) / 2) | 0;
                            if(parent_idx >= 0 && min_heap[sq_idx].pathlen < min_heap[parent_idx].pathlen) {
                                let temp = min_heap[parent_idx];
                                min_heap[parent_idx] = min_heap[sq_idx];
                                min_heap[sq_idx] = temp;
                                heap_search.set(surr_sq, parent_idx);
                                heap_search.set(min_heap[sq_idx], sq_idx);
                                bubbled = false;
                            }
                            console.log(parent_idx);
                        }
                    }
                }
            });
            this.setState({ board: this.state.board });
            await this.sleep(0);
        }
        let target_sq = this.state.board.grid[this.state.target[0]][this.state.target[1]];
        let temp = target_sq.parent;
        while(temp != null) {
            temp.ispath = true;
            this.setState({ board: this.state.board });
            await this.sleep(0);
            if(this.state.stop) {
                return;
            }
            temp = temp.parent;
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
                <Grid width={this.state.width} height={this.state.height} 
                searching={this.state.searching} board={this.state.board} 
                algo={this.state.algo} reset={this.state.reset}/>
                <GraphSidebar reset_all={this.reset_all} searching={this.state.searching} 
                set_algo={this.set_algo} search={this.search} />
            </div>
        )
    }
}