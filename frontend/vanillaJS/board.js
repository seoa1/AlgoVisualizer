import Tile from './tile';

export default class Board {
    constructor() {
        this.grid = [];
        this.build_grid();
    }

    build_grid() {
        for(let i=0; i<26; i++) {
            this.grid.push([]);
            for(let j=0; j<50; j++) {
                this.grid[i].push(new Tile(i*100 + j, [i, j]));
            }
        }
    }

}