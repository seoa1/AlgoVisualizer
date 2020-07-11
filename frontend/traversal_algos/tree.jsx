import React from 'react';
import Node from './node';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.init_arr(10)
        }

        this.init_arr = this.init_arr.bind(this);
        this.insert_node = this.insert_node.bind(this);
        this.size = 0;
        this.root = null;
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

    insert_node(val) {
        if(this.size == 0) {

        }
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}