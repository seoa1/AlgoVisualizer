import Node from './node';

export default class Tree {
    constructor() {
        this._root = null;
        this._depth = 0;
    }

    
    insert_node(val) {
        if(this._depth === 0) {
            this._root = new Node(val);
            this._depth++;
        }
        else {
            let temp = this._root;
            let prev = null;
            let curr_depth = 0;
            while(temp !== null) {
                prev = temp;
                if(val > temp.val) {
                    temp = temp.right;
                }
                else {
                    temp = temp.left;
                }
                curr_depth++;
            }
            if(val > prev.val) {
                prev.right = new Node(val);
            }
            else {
                prev.left = new Node(val);
            }
            curr_depth++;
            if(curr_depth > this._depth) {
                this._depth = curr_depth;
            }
        }
    }

    get root() {
        return this._root;
    }

    set root(root) {
        this._root = root;
    }

    get depth() {
        return this._depth;
    }

    set depth(depth) {
        this._depth = depth;
    }
}