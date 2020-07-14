export default class Tile {
    constructor(id, pos) {
        this._wall = false;
        this._target = false;
        this._searched = false;
        this._id = id;
        this._start = false;
        this._pos = pos;
    }
    get wall() { return this._wall; }
    get target() { return this._target; }
    get searched() { return this._searched; }
    get id() { return this._id; }
    get start() { return this._start; }
    get pos() { return this._pos; }
    set wall(wall) { this._wall = wall; }
    set target(target) { this._target = target; };
    set searched(searched) { this._searched = searched; }
    set start(start) { this._start = start };
    set pos(pos) { this._pos = pos; }
}