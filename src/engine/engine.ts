import { Mine, Tile } from "./tile";

export class Engine {
    private field: Tile[][]

    constructor(rows: number, cols: number) {
        this.field = []

        let id = 0;
        for (var row: number = 0; row < rows; row++) {
            this.field[row] = [];

            for (var col: number = 0; col < cols; col++) {
                this.field[row][col] = new Mine(id, row, col);

                id++;
            }
        }
    }

    render(field: (tile: Tile) => void): void {
        for (const v of this.field) {
            for (const tile of v) {
                field(tile)
            }
        }
    }
}
