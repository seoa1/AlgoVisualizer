import React from 'react';
import Array from './array';
import Graph from './graph';
import Sidebar from './sorting_sidebar';

export default class SortingDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 20,
            arr: new Array(size)
        }
        this.set_size = this.set_size.bind(this);
        this.fill_arr_rand = this.fill_arr_rand.bind(this);
    }

    set_size(size) {
        this.state.size = size;
        this.state.arr = new Array(size);
        this.fill_arr_rand();
    }

    fill_arr_rand() {
        let size = this.state.size;
        for(let i=1; i<=size; i++) {
            this.state.arr = arr[i - 1] = i;
        }
        //fisher-yates shuffle
        for(let i=size - 1; i>0; i--) {
            let rand = Math.random() * i | 0;
            let temp = this.state.arr[rand];
            this.state.arr[rand] = this.state.arr[i];
            this.state.arr[i] = temp;
        }
        this.setState({ size: this.state.size, arr: this.state.arr });
    }

    render() {
        return( 
            <div>
                <Array arr={this.state.arr}/>
                <Graph arr={this.state.arr}/>
                <Sidebar size={this.state.size}/>
            </div>
        )
    }
}