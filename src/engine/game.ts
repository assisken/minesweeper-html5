import { OpenType, Tile, TileImpl } from "./tile";

type Board = TileImpl[][]

type GameParameters = {
    readonly rows: number
    readonly columns: number
    readonly totalMines: number
    readonly withSaveSpot: boolean
}

type renderCallback = (ids: TileImpl[]) => void

export interface Game {
    onTileTriggered(tile: TileImpl): void
    updateTile(tile: TileImpl): void
    triggerNeighbors(tile: TileImpl, neighborUpdate: (tile: Tile) => void): void
    onClick(tile: TileImpl, mouseButton: OpenType): void
}

export class GameImpl implements Game {
    public readonly columns: number
    public readonly rows: number
    private readonly totalMines: number

    private board: TileImpl[][]
    private firstClickHappened: boolean

    private renderCallback: renderCallback | undefined = undefined

    setRenderCallback(renderCallback: renderCallback) {
        this.renderCallback = renderCallback
    }

    constructor(params: GameParameters) {
        this.columns = params.columns
        this.rows = params.rows
        this.totalMines = params.totalMines

        this.board = this.createEmptyBoard()

        if (params.withSaveSpot) {
            this.firstClickHappened = false
        } else {
            this.firstClickHappened = true
            this.placeMines(this.totalMines, 0, 0)
            this.calculateAdjacents()
        }
    }

    handleFirstClick(firstTile: TileImpl) {
        this.firstClickHappened = true

        this.board = this.createEmptyBoard()
        this.placeMines(this.totalMines, firstTile.row, firstTile.column)
        this.calculateAdjacents()
        this.renderCallback!(this.board.flat())
    }

    onClick(tile: TileImpl, clickButton: OpenType) {
        if (!this.firstClickHappened) this.handleFirstClick(tile)

        tile.trigger(clickButton)
    }

    onRender(field: (tile: TileImpl) => void): void {
        for (const v of this.board) {
            for (const tile of v) {
                field(tile)
            }
        }
    }

    onTileTriggered(tile: TileImpl): void {
        this.renderCallback!([tile])
    }

    updateTile(tile: TileImpl): void {
        const revealed = this.updateCell(tile.row, tile.column)
        this.renderCallback!(revealed)
    }

    triggerNeighbors(tile: TileImpl): void {
        const neighbors = this.getNeighbors(tile.row, tile.column)

        let revealed: TileImpl[] = []
        for (const [x, y] of neighbors) {
            revealed.push(...this.updateCell(x, y))
        }

        this.renderCallback!(revealed)
    }

    createEmptyBoard(): Board {
        let board: Board = []
        let id = 0;
        for (var col: number = 0; col < this.columns; col++) {
            board[col] = [];

            for (var row: number = 0; row < this.rows; row++) {
                board[col][row] = new TileImpl({
                    id: id,
                    row: col,
                    column: row,
                    isFlagged: false,
                    isMine: false,
                    isRevealed: false,
                    adjacentMines: 1,
                }, this);

                id++;
            }
        }

        return board
    }

    getNeighbors(x: number, y: number): [number, number][] {
        const neighbors: [number, number][] = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < this.columns && ny >= 0 && ny < this.rows) {
                    neighbors.push([nx, ny]);
                }
            }
        }
        return neighbors;
    }

    placeMines(totalMines: number, safeX: number, safeY: number): void {
        const safeZone = new Set<string>();

        // Сохраняем safe-зону (первая ячейка и её соседи)
        for (const [nx, ny] of this.getNeighbors(safeX, safeY)) {
            safeZone.add(`${nx},${ny}`);
        }
        safeZone.add(`${safeX},${safeY}`);

        let placed = 0;
        while (placed < totalMines) {
            const x = Math.floor(Math.random() * this.columns);
            const y = Math.floor(Math.random() * this.rows);
            const key = `${x},${y}`;

            if (!this.board[x][y].isMine && !safeZone.has(key)) {
                this.board[x][y].isMine = true;
                placed++;
            }
        }
    }

    calculateAdjacents(): void {
        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.board[x][y].isMine) continue;

                let count = 0;
                for (const [nx, ny] of this.getNeighbors(x, y)) {
                    if (this.board[nx][ny].isMine) count++;
                }
                this.board[x][y].adjacentMines = count;
            }
        }
    }

    updateCell(x: number, y: number): TileImpl[] {
        const stack: [number, number][] = [[x, y]];
        const revealedTiles: TileImpl[] = []

        while (stack.length > 0) {
            const [cx, cy] = stack.pop()!;
            const tile = this.board[cx][cy];

            if (tile.isRevealed || tile.isFlagged) continue;
            tile.isRevealed = true
            tile.mineEvent()
            revealedTiles.push(tile)

            if (tile.adjacentMines === 0 && !tile.isMine) {
                for (const [nx, ny] of this.getNeighbors(cx, cy)) {
                    const neighbor = this.board[nx][ny];
                    if (!neighbor.isRevealed && !neighbor.isMine) {
                        stack.push([nx, ny]);
                    }
                }
            }
        }

        return revealedTiles
    }
}
