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
            algo: "select"
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

    selection_sort() {
        for(let i=0; i<this.state.size - 1; i++) {
            this.setState({ comparer: i });
            let min = 0;
            let min_idx = i;
            for(let j=i; j<this.state.size; j++) {
                this.setState({ compare_to: j });
                if(j == i) {
                    min = this.state.arr[j];
                }
                else {
                    if(this.state.arr[j] < min) {
                        this.setState({ comparer: j });
                        min = this.state.arr[j];
                        min_idx = j;
                    }
                }
            }
            this.swap_indeces(i, min_idx);
            this.setState({ arr: this.state.arr });
        }
    }

    swap_indeces(idx1, idx2) {
        let temp = this.state.arr[idx1];
        this.state.arr[idx1] = this.state.arr[idx2];
        this.state.arr[idx2] = temp;
    }

    bubble_sort() {
        let sortable = true;
        while(sortable) {
            sortable = false;
            for(let i=0; i<this.state.size - 1; i++) {
                this.setState({ comparer: i, compare_to: i + 1 });
                if(this.state.arr[i] > this.state.arr[i + 1]) {
                    this.swap_indeces(i, i+1);
                    this.setState({ arr: this.state.arr });
                    sortable = true;
                }
            }
        }
    }

    insertion_sort() {
        for(let i=1; i<this.state.size; i++) {
            let num = this.state.arr[i];
            this.setState({ comparer: i });
            for(let j= i - 1; j>=-1; j--) {
                if(j==-1) {
                    for(let k=i - 1; k>=0; k--) {
                        this.state.arr[k + 1] = this.state.arr[k]; 
                    }
                    this.state.arr[0] = num;
                }
                else {
                    this.setState({ compare_to: j });
                    if(num > this.state.arr[j]) {
                        for(let k=i - 1; k>j; k--) {
                            this.state.arr[k + 1] = this.state.arr[k];
                        }
                        this.state.arr[j + 1] = num;
                        break;
                    }
                }
            }
            this.setState({ arr: this.state.arr });
        }
    }

    // make this sort in a single array. recursive solutions should pass in indeces in array. use three pointers.
    merge_sort(arr) {
        if(arr.length > 1) {
            let mid = arr.length / 2 | 0;
            let left = arr.slice(0, mid);
            let right = arr.slice(mid, arr.length);
            this.merge_sort(left);
            this.merge_sort(right);
            let i = 0;
            let j = 0;
            let k = 0;
            while(i < left.length || j < right.length) {
                if((j >= right.length && i < left.length) || left[i] < right[j]) {
                    arr[k] = left[i];
                    i++;
                }
                else {
                    arr[k] = right[j];
                    j++;
                }
                this.setState({ arr: this.state.arr });
                k++;
            }
        }
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
            default:
                break;
        }
    }

    render() {
        return( 
            <div>
                <Array arr={this.state.arr} comp={this.state.comparer} comp_to={this.state.compare_to}/>
                <Graph arr={this.state.arr} comp={this.state.comparer} comp_to={this.state.compare_to}/>
                <Sidebar size={this.state.size} sort={this.sort} algo={this.state.algo} setalgo={this.set_algo} rand={this.fill_arr_rand}/>
            </div>
        )
    }
}