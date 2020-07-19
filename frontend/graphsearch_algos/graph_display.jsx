import React from 'react';
import GraphSidebar from './graph_sidebar';
import Grid from './grid';
import Board from '../vanillaJS/board';

export default class GraphDisplay extends React.Component {
    constructor(props){
        super(props);
        let column_width = (window.innerWidth - 250) / 50;
        let num_rows = ((window.innerHeight - 100) / column_width) | 0;
        this.state = {
            algo: "bfs",
            board: new Board(num_rows),
            start: [12, 15],
            target: [12, 35],
            searching: false,
            stop: false,
            reset: false,
            width: 0,
            height: 0,
            tick_time: 1
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
        this.a_star = this.a_star.bind(this);
        this.astar_heapify = this.astar_heapify.bind(this);
        this.change_tick_time = this.change_tick_time.bind(this);
    }
    componentDidMount() {
        this.update_window_dims();
        window.addEventListener('resize', this.update_window_dims);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.update_window_dims);
    }

    change_tick_time(time) {
        this.setState({ tick_time: time });
    }

    update_window_dims() {
        this.state.board.grid[this.state.start[0]][this.state.start[1]] = false;
        this.state.board.grid[this.state.target[0]][this.state.target[1]] = false;
        let column_width = (window.innerWidth - 250) / 50;
        let num_rows = ((window.innerHeight - 100) / column_width) | 0;
        let start_row = (num_rows / 2 | 0) - 1;
        this.state.board = new Board(num_rows);
        // this.state.width = window.innerWidth;
        // this.state.height = window.innerHeight;
        // this.state.start = [start_row, 15];
        // this.state.target = [start_row, 35];
        this.state.board.grid[start_row][15].start = true;
        this.state.board.grid[start_row][35].target = true;
        this.setState({ width: window.innerWidth, 
            height: window.innerHeight, 
            board: this.state.board, 
            start: [start_row, 15],
            target: [start_row, 35]
        });
    
    }

    update_board() {
        this.setState({ board: this.state.board });
    }

    async reset_all() {
        await this.setState({ stop: true, reset: true });
        let column_width = (window.innerWidth - 250) / 50;
        let num_rows = ((window.innerHeight - 100) / column_width) | 0;
        this.state.board = new Board(num_rows);
        this.state.board.grid[this.state.start[0]][this.state.start[1]].start = true;
        this.state.board.grid[this.state.target[0]][this.state.target[1]].target = true;
        this.setState({ board: this.state.board, reset: false, searching: false });
    }

    reset_searched() {
        this.state.board.grid.flat(1).forEach( sq => {
            sq.searched = false;
            sq.ispath = false;
            sq.parent = null;
            sq.pathlen = 100000000000000;
            sq.f = 100000000000000;
        })

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
                await this.dfs();
                break;
            case "djikstra":
                await this.djikstra();
                break;
            case "astar":
                await this.a_star();
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
        let i = 0;
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
                let surr = this.surr_squares(curr_sq.pos);
                surr.forEach( sq => {
                    if(!seen.has(sq.id)) {
                        queue.push(sq);
                        sq.parent = curr_sq;
                        seen.add(sq.id);
                    }
                });
            }
            
            curr_sq.searched = true;
            i++;
            if(i % this.state.tick_time == 0) {
                this.setState({ board: this.state.board });
                await this.sleep(0);
            }
            if(queue.length === 0) {
                this.setState({ searching: false });
                return;
            }
            
            
        }
        //this.setState({ board: this.state.board });
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
        let i=0;
        while(!found) {
            if(this.state.stop) {
                return;
            }
            let curr_sq = stack.pop();
            if(curr_sq.target) {
                found = true;
                break;
            }
            else {
                this.surr_squares(curr_sq.pos).forEach( sq => {
                    stack.push(sq);
                    sq.parent = curr_sq;
                    
                })
            }
            curr_sq.searched = true;
            i++;
            if(i % this.state.tick_time == 0) {
                this.setState({ board: this.state.board });
                await this.sleep(0);
            }
            console.log(stack.length);
            if(stack.length === 0) {
                this.setState({ searching: false });
                return;
            }
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

    astar_heapify(arr, root, heap_search) {
        let smallest = root;
        let left = 2 * root + 1;
        let right = 2 * root + 2;
        if(left < arr.length && arr[left].f <= arr[smallest].f) {
            smallest = left;
        }
        if(right < arr.length && arr[right].f <= arr[smallest].f) {
            smallest = right;
        }
        if(smallest !== root) {
            heap_search.set(arr[smallest], root);
            heap_search.set(arr[root], smallest);
            let temp = arr[smallest];
            arr[smallest] = arr[root];
            arr[root] = temp;
            this.astar_heapify(arr, smallest, heap_search);
        }
    }

    async a_star() {
        let start_sq = this.state.board.grid[this.state.start[0]][this.state.start[1]];
        start_sq.pathlen = 0;
        start_sq.f = 0;
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
        let i=0;
        while(!found) {
            if(this.state.stop) {
                return;
            }
            let temp = min_heap[0];
            min_heap[0] = min_heap[min_heap.length - 1];
            min_heap[min_heap.length - 1] = temp;

            let min_sq = min_heap.pop();
            heap_search.delete(min_sq);
            await this.astar_heapify(min_heap, 0, heap_search);

            if(min_sq.target) {
                found = true;
                break;
            }
            if(min_sq.pathlen > 10000000) {
                this.setState({ searching: false });
                return;
            }
            min_sq.searched = true;

            this.surr_squares(min_sq.pos).forEach( surr_sq => {
                let sq_idx = heap_search.get(surr_sq);
                if(sq_idx < min_heap.length) {
                    let bubbled = true;
                    let pot_pathlen = min_sq.pathlen + 1;
                    if(pot_pathlen < surr_sq.pathlen) {
                        surr_sq.parent = min_sq;
                        surr_sq.pathlen = pot_pathlen;
                    }
                    let manhattan = Math.abs(surr_sq.pos[0] - this.state.target[0]) + Math.abs(surr_sq.pos[1] - this.state.target[1]);
                    let pot_f = manhattan + (surr_sq.pathlen * 0.99);
                    if(pot_f < surr_sq.f ) {
                        surr_sq.f = pot_f;
                    }
                    
                    bubbled = false;
                    
                    
                    // bubble up the heap
                    while(!bubbled) {
                        sq_idx = heap_search.get(surr_sq);
                        bubbled = true;
                        let parent_idx = ((sq_idx - 1) / 2) | 0;
                        if(parent_idx >= 0 && parent_idx !== sq_idx && min_heap[sq_idx].f <= min_heap[parent_idx].f) {
                            let temp = min_heap[parent_idx];
                            min_heap[parent_idx] = min_heap[sq_idx];
                            min_heap[sq_idx] = temp;
                            heap_search.set(surr_sq, parent_idx);
                            heap_search.set(min_heap[sq_idx], sq_idx);
                            bubbled = false;
                        }
                    }
                }
                
            });
            i++;
            if(i % this.state.tick_time == 0) {
                this.setState({ board: this.state.board });
                await this.sleep(0);
            }
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
        let i=0;
        while(!found) {
            if(this.state.stop) {
                return;
            }
            let temp = min_heap[0];
            min_heap[0] = min_heap[min_heap.length - 1];
            min_heap[min_heap.length - 1] = temp;

            let min_sq = min_heap.pop();
            heap_search.delete(min_sq);
            this.heapify(min_heap, 0, heap_search);

            if(min_sq.target) {
                found = true;
                break;
            }
            if(min_sq.pathlen > 10000000) {
                this.setState({ searching: false });
                return;
            }

            min_sq.searched = true;

            this.surr_squares(min_sq.pos).forEach( surr_sq => {
                let sq_idx = heap_search.get(surr_sq);
                if(sq_idx < min_heap.length) {

                    let bubbled = true;
                    let pot_pathlen = min_sq.pathlen + 1;
                    if(pot_pathlen < surr_sq.pathlen) {
                        surr_sq.pathlen = pot_pathlen;
                        bubbled = false;
                        surr_sq.parent = min_sq;
                    }
                    
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
                    }
                }
                
            });
            i++;
            if(i % this.state.tick_time == 0) {
                this.setState({ board: this.state.board });
                await this.sleep(0);
            }
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
        let column_width = (window.innerWidth - 250) / 50;
        let num_rows = ((window.innerHeight - 100) / column_width) | 0;
        let DIRS = [[0,1],[1,0],[0,-1],[-1,0]];
        let squares = [];
        DIRS.forEach( dir => {
            let new_pos = [dir[0] + pos[0], dir[1] + pos[1]];
            if(new_pos[0] >= 0 && new_pos[0] < num_rows && new_pos[1] >= 0 && new_pos[1] < 50) {
                let pot_sq = this.state.board.grid[new_pos[0]][new_pos[1]];
                if(!pot_sq.searched && !pot_sq.wall) {
                    squares.push(pot_sq);

                }
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
                <GraphSidebar algo={this.state.algo} change_time={this.change_tick_time}
                reset_all={this.reset_all} searching={this.state.searching} 
                set_algo={this.set_algo} search={this.search} />
            </div>
        )
    }
}