import React from 'react';
import Array from './array';
import Graph from './graph';
import Sidebar from './sorting_sidebar';

export default class SortingDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 20,
            arr: this.init_arr(20),
            comparer: null,
            compare_to: null, 
            algo: "select",
            min: null

        }
        this.set_algo = this.set_algo.bind(this);
        this.set_size = this.set_size.bind(this);
        this.fill_arr_rand = this.fill_arr_rand.bind(this);
        this.selection_sort = this.selection_sort.bind(this);
        this.swap_indeces = this.swap_indeces.bind(this);
        this.bubble_sort = this.bubble_sort.bind(this);
        this.insertion_sort = this.insertion_sort.bind(this);
        this.sort = this.sort.bind(this);
        this.merge_sort = this.merge_sort.bind(this);
        this.init_arr = this.init_arr.bind(this);
        this.sleep = this.sleep.bind(this);
        this.quick_sort = this.quick_sort.bind(this);
        this.heap_sort = this.heap_sort.bind(this);
        this.heapify = this.heapify.bind(this);
        this.shell_sort = this.shell_sort.bind(this);

        this.wait = 10;
    }

    sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    set_algo(newalgo) {
        this.setState({ algo: newalgo });
    }

    set_size(size){
        this.state.size = size;
        this.state.arr = init_arr(size);
        this.setState({ arr: this.state.arr });
    }

    init_arr(size) {
        let my_arr = [];
        for(let i=1; i<=size; i++) {
            my_arr.push(i);
        }
        //fisher-yates shuffle
        for(let i=size - 1; i>0; i--) {
            let rand = Math.random() * i | 0;
            let temp=my_arr[i];
            my_arr[i] = my_arr[rand];
            my_arr[rand] = temp;
        }
        return my_arr;
    }

    fill_arr_rand() {
        let size = this.state.size;
        for(let i=1; i<=size; i++) {
            this.state.arr[i - 1] = i;
        }
        //fisher-yates shuffle
        for(let i=size - 1; i>0; i--) {
            let rand = Math.random() * i | 0;
            this.swap_indeces(rand, i);
        }
        this.setState({ size: this.state.size, arr: this.state.arr });
    }

    swap_indeces(idx1, idx2) {
        let temp = this.state.arr[idx1];
        this.state.arr[idx1] = this.state.arr[idx2];
        this.state.arr[idx2] = temp;
    }

    //sorting algorithms below
    async selection_sort() {
        for(let i=0; i<this.state.size - 1; i++) {
            let min = 0;
            let min_idx = i;
            for(let j=i ; j<this.state.size; j++) { 
                if(j == i) {
                    min = this.state.arr[j];
                }
                else {
                    if(this.state.arr[j] < min) {
                        min = this.state.arr[j];
                        min_idx = j;
                    }
                }
                this.setState({comparer: i, compare_to: j, min: min_idx});
                await this.sleep(this.wait);
            }
            this.swap_indeces(i, min_idx);
            this.setState({ arr: this.state.arr });
        }
        this.setState({comparer: null, compare_to: null, min: null});
    }


    async bubble_sort() {
        this.setState({min: null});
        let sortable = true;
        while(sortable) {
            sortable = false;
            for(let i=0; i<this.state.size - 1; i++) {
                if(this.state.arr[i] > this.state.arr[i + 1]) {
                    this.swap_indeces(i, i+1);
                    this.setState({comparer: i, compare_to: i + 1});
                    sortable = true;
                }
                else {
                    this.setState({comparer: i, compare_to: i + 1});
                }
                await this.sleep(10);
            }
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
    }

    async insertion_sort() {
        this.setState({min: null});
        for(let i=1; i<this.state.size; i++) {
            let num = this.state.arr[i];
            for(let j= i - 1; j>=-1; j--) {
                if(j==-1) {
                    for(let k=i - 1; k>=0; k--) {
                        this.state.arr[k + 1] = this.state.arr[k]; 
                    }
                    this.state.arr[0] = num;
                }
                else {
                    if(num > this.state.arr[j]) {
                        for(let k=i - 1; k>j; k--) {
                            this.state.arr[k + 1] = this.state.arr[k];
                        }
                        this.state.arr[j + 1] = num;
                        break;
                    }
                    
                }
                this.setState({comparer: i, compare_to: j});
                await this.sleep(this.wait);
            }
            this.setState({ arr: this.state.arr });
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
    }

    async merge_sort(l_idx, r_idx) {
        if(l_idx < r_idx) {
            let mid_idx = (l_idx + r_idx) / 2 | 0;
            await this.merge_sort(l_idx, mid_idx);
            await this.merge_sort(mid_idx+1, r_idx);
            let left = this.state.arr.slice(l_idx, mid_idx + 1);
            let right = this.state.arr.slice(mid_idx + 1, r_idx + 1);
            let i = 0
            let j = 0
            let k = l_idx;
            while(i < left.length || j < right.length) {
                this.setState({ comparer: i + k, compare_to: mid_idx + 1 + j });
                if((j >= right.length && i < left.length) || left[i] < right[j]) {
                    for(let m = l_idx + j; m > k; m--) {
                        this.state.arr[m] = this.state.arr[m - 1];
                    }
                    this.state.arr[k] = left[i];
                    i++;
                }
                else {
                    for(let m = mid_idx + 1 + j; m > k; m--) {
                        this.state.arr[m] = this.state.arr[m - 1];
                    }
                    this.state.arr[k] = right[j];
                    j++;
                }
                this.setState({ arr: this.state.arr });
                k++;
                await this.sleep(1.5 * this.wait);
            }
            
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
    }

    async quick_sort(l_idx, r_idx) {
        if(l_idx < r_idx) {
            let pivot = this.state.arr[r_idx];
            let i = l_idx - 1;
            for(let j = l_idx; j <= r_idx; j++) {
                this.setState({comparer: pivot, compare_to: j, arr: this.state.arr});
                await this.sleep(this.wait * 2);
                if(this.state.arr[j] < pivot) {
                    i++;
                    this.swap_indeces(i, j);
                }
            }
            this.swap_indeces(i + 1, r_idx);
            let part_idx = i + 1;
            await this.quick_sort(l_idx, part_idx - 1);
            await this.quick_sort(part_idx + 1, r_idx);
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
    }

    async heap_sort() {
        for(let i = (this.state.arr.length / 2 | 0) - 1; i>=0 ; i--) {
            await this.heapify(i, this.state.arr.length);
            this.setState({arr: this.state.arr});
        }
        for(let i = this.state.arr.length - 1; i > 0; i--) {
            this.swap_indeces(0, i);
            await this.heapify(0, i);
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
        
    }

    async heapify(root, n) {
        let max = root;
        this.setState({comparer: root});
        let l_idx = 2 * root + 1;
        let r_idx = 2 * root + 2;
        this.setState({compare_to: l_idx});
        if(l_idx < n && this.state.arr[max] < this.state.arr[l_idx]) {
            max = l_idx;
        }
        await this.sleep(this.wait * 1);
        this.setState({compare_to: r_idx});
        if(r_idx < n && this.state.arr[max] < this.state.arr[r_idx]) {
            max = r_idx;
        }
        if(max != root) {
            this.swap_indeces(root, max);
            this.setState({arr: this.state.arr});
            await this.sleep(this.wait * 1);
            await this.heapify(max, n);
        }
    }

    async shell_sort() {
        this.setState({min: null});
        let gap = this.state.arr.length / 2 | 0;
        while(gap > 0) {
            for(let i = gap; i < this.state.arr.length; i++) {
                let temp = this.state.arr[i];
                let j = i;
                while(j >= gap && this.state.arr[j - gap] > temp) {
                    this.setState({comparer: j, compare_to: j - gap});
                    await this.sleep(this.wait * 3);
                    this.state.arr[j] = this.state.arr[j - gap];
                    j -= gap;
                }
                this.state.arr[j] = temp;
            }
            gap = gap / 2 | 0;
        }
        this.setState({arr: this.state.arr, comparer: null, compare_to: null});
    }

    sort() {
        switch (this.state.algo) {
            case "select":
                this.selection_sort();
                break;
            case "bubble":
                this.bubble_sort();
                break;
            case "insert":
                this.insertion_sort();
                break;
            case "merge":
                this.setState({min: null});
                this.merge_sort(0, this.state.arr.length - 1);
                break;
            case "quick":
                this.setState({min: null});
                this.quick_sort(0, this.state.arr.length - 1);
                break;
            case "heap":
                this.setState({min: null});
                this.heap_sort();
                break;
            case "shell":
                this.shell_sort();
                break;
            default:
                break;
        }
        
    }

    render() {
        return( 
            <div className="display">
                <div className="mainbody">
                    <Array arr={this.state.arr} comp={this.state.comparer} comp_to={this.state.compare_to}/>
                    <Graph min={this.state.min} arr={this.state.arr} comp={this.state.comparer} comp_to={this.state.compare_to}/>
                </div>
                
                <Sidebar size={this.state.size} sort={this.sort} algo={this.state.algo} setalgo={this.set_algo} rand={this.fill_arr_rand}/>
            </div>
        )
    }
}