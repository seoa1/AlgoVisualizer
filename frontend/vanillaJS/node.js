export default class Node {
    constructor(val = 0, right = null, left = null) {
        this._right = right;
        this._val = val;
        this._left = left;
    }

    get right() {
        return this._right;
    }

    set right(right) {
        this._right = right;
    }

    get val() {
        return this._val;
    }

    set val(val) {
        this._val = val;
    }

    get left() {
        return this._left;
    }

    set left(left) {
        this._left = left;
    }
}