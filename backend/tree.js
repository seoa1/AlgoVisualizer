import Node from './node';

export default class Tree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    
    insert_node(val) {
        if(this.size === 0) {
            this.root = new Node(val);
        }
        else {
            let temp = root;
            let prev = null;
            while(temp !== null) {
                prev = temp;
                if(val > temp.val) {
                    temp = temp.right;
                }
                else {
                    temp = temp.left;
                }
            }
            if(val > prev.val) {
                prev.right = new Node(val);
            }
            else {
                prev.left = new Node(val);
            }
        }
    }
}