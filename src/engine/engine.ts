import { Tile, TileType, Number } from "./tile";

export class Engine {
    private field: Tile[][]

    constructor(rows: number, cols: number) {
        this.field = []

        const tileTypes = Object.keys(TileType)
        let id = 0;

        for (var row: number = 0; row < rows; row++) {
            this.field[row] = [];

            for (var col: number = 0; col < cols; col++) {
                const random = Math.floor(Math.random() * tileTypes.length);
                const pickedType = TileType[tileTypes[random] as keyof typeof TileType]

                this.field[row][col] = new Number(id, row, col, pickedType);

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
