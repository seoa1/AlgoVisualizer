import React from 'react';
import Tree from '../vanillaJS/tree';
import Line from './line';
import Node from './node';

export default class TreeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [10,12,4,2,8,11,16,1,3,6,9,14,5,7,13,15],
            tree: new Tree(),
            render_arr: []
        }   
        this.create_tree = this.create_tree.bind(this);
        this.build_tree = this.build_tree.bind(this);
        this.build_node_arr = this.build_node_arr.bind(this);
        this.node_arr = [];
    }

    build_node_arr() {
        let queue = [this.state.tree.root];
        while(queue.length > 0) {
            let first_node = queue.pop();
            this.node_arr.push(first_node);
            if(first_node.left !== null) {
                queue.unshift(first_node.left);
            }
            if(first_node.right !== null) {
                queue.unshift(first_node.right);
            }
        }
    }

    async create_tree() {
        this.state.arr.forEach( num => {
            this.state.tree.insert_node(num);
        })
        this.setState({ tree: this.state.tree });
    }

    build_tree() {
        let render_arr = [];
        let positions = [[50,10],
                        [30,30], [70,30],
                        [20,50],[40,50],[60,50],[80,50],
                        [15,70],[25,70],[35,70],[45,70],[75,70],
                        [30,90],[40,90],[70,90],[80,90]];
        let pos;
        let parent_id;
        for(let i=0; i<16; i++) {
            if(i === 0) {
                parent_id = null;
            }
            else if(i <= 2) {
                parent_id = 0;
            }
            else if(i <= 4) {
                parent_id = 1;
            }
            else if(i <= 6) {
                parent_id = 2;
            }
            else if(i <= 8) {
                parent_id = 3;
            }
            else if(i <= 10) {
                parent_id = 4;
            }
            else if(i === 11) {
                parent_id = 6;
            }
            else if(i <= 13) {
                parent_id = 9;
            }
            else {
                parent_id = 11;
            }
            pos = positions[i];
            render_arr.push(<Node id={`node${i}`} key={i} pos={pos} node={this.node_arr[i]}/>);
            if(i !== 0) {
                //render_arr.push(<Line node1_id={`node${parent_id}`} node2_id={`node${i}`} key={i + 100*i}/>);
            }
        }
        this.setState({ render_arr: render_arr });
    }

    async componentDidMount() {
        await this.create_tree();
        await this.build_node_arr();
        await this.build_tree();
    }

   
    render() {
        return(
            <div className="tree_disp">
                {this.state.render_arr}
            </div>
        )
    }
}