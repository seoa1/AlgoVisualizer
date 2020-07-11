export default class Node {
    constructor(val = 0, next = null) {
        this._next = next;
        this._val = val;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }

    get val() {
        return this._val;
    }

    set val(val) {
        this._val = val;
    }
}