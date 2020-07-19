import Tile from './tile';

export default class Board {
    constructor(height=26) {
        this.grid = [];
        this.build_grid(height);
    }

    build_grid(height) {
        for(let i=0; i<height; i++) {
            this.grid.push([]);
            for(let j=0; j<50; j++) {
                this.grid[i].push(new Tile(i*100 + j, [i, j]));
            }
        }
    }

}