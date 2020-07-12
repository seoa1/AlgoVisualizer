import React from 'react';
import Tree from '.../backend/tree';
import Line from './line';
import Node from './node';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.init_arr(10),
            tree: new Tree()
        }

        this.init_arr = this.init_arr.bind(this);
        this.init_tree = this.init_tree.bind(this);
        this.new_tree = this.new_tree.bind(this);

        this.size = 0;
        this.root = null;
    }

    componentDidMount() {
        this.init_tree();
    }

    new_tree(size) {
        this.state.arr = this.init_arr(size);
        this.init_tree();
        this.setState({ tree: this.state.tree, arr: this.state.arr });
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

    init_tree() {
        this.state.arr.forEach( ele => {
            this.state.tree.insert_node(ele);
        })
        this.setState({ tree: this.state.tree });
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}