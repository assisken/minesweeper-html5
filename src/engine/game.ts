import { Observer } from "./observer";
import { ActionType, Tile, TileType } from "./tile";

type Board = Tile[][]

type GameParameters = {
    readonly rows: number
    readonly columns: number
    readonly totalMines: number
    readonly withSaveSpot: boolean
    readonly flagObserver: Observer<number>
    readonly isTimerRunningObserver: Observer<boolean>
}

type renderCallback = (ids: Iterable<Tile>) => void

export interface Game {
    triggerNeighbors(tile: Tile, options: { actionType: ActionType, radius?: number, ignoreClosed?: boolean }): void
    onClick(tile: Tile, mouseButton: ActionType): void
    gameOver(): void
    placeFlag(): void
    removeFlag(): void
}

export class GameImpl implements Game {
    public readonly columns: number
    public readonly rows: number
    private readonly totalMines: number
    private flagsRemaining: Observer<number>
    private isTimerRunningObserver: Observer<boolean>
    private handleClicks = true

    private board: Tile[][]
    private firstClickHappened: boolean
    private mines: Set<Tile> = new Set()

    private renderCallback: renderCallback | undefined = undefined

    setRenderCallback(renderCallback: renderCallback) {
        this.renderCallback = renderCallback
    }

    constructor(params: GameParameters) {
        this.columns = params.columns
        this.rows = params.rows
        this.totalMines = params.totalMines
        this.flagsRemaining = params.flagObserver
        this.isTimerRunningObserver = params.isTimerRunningObserver

        this.board = this.createEmptyBoard()

        if (params.withSaveSpot) {
            this.firstClickHappened = false
        } else {
            this.firstClickHappened = true
            this.placeMines(this.totalMines, 0, 0)
            this.calculateAdjacents()
        }
    }

    placeFlag(): void {
        this.flagsRemaining.value--
    }

    removeFlag(): void {
        this.flagsRemaining.value++
    }

    handleFirstClick(firstTile: Tile) {
        this.firstClickHappened = true

        this.board = this.createEmptyBoard()
        this.placeMines(this.totalMines, firstTile.row, firstTile.column)
        this.calculateAdjacents()
        this.renderCallback!(this.board.flat())
        this.isTimerRunningObserver.value = true
    }

    onClick(tile: Tile, clickButton: ActionType) {
        if (!this.handleClicks) return

        if (clickButton != ActionType.FLAG && !this.firstClickHappened)
            this.handleFirstClick(tile)

        tile.trigger(clickButton, {})
        this.updateTile(tile)
    }

    onRender(field: (tile: Tile) => void): void {
        for (const v of this.board) {
            for (const tile of v) {
                field(tile)
            }
        }
    }

    updateTile(tile: Tile): void {
        const revealed = this.getUnrevealedCells(tile.row, tile.column, 1)
        this.renderCallback!(revealed)
    }

    triggerNeighbors(tile: Tile, options: { actionType: ActionType, radius?: number }): void {
        const radius = options.radius ?? Infinity
        const neighbors = this.getNeighbors(tile.row, tile.column)

        let revealed: Tile[] = []
        for (const [x, y] of neighbors) {
            revealed.push(...this.getUnrevealedCells(x, y, radius))
        }

        for (const tile of revealed) {
            tile.trigger(options.actionType, { chain: true })
        }

        this.renderCallback!(revealed)
    }

    gameOver() {
        this.handleClicks = false
        for (const mine of this.mines) {
            mine.trigger(ActionType.GAME_OVER, {})
        }
        this.isTimerRunningObserver.value = false
        this.renderCallback!(this.mines.values())
    }

    createEmptyBoard(): Board {
        let board: Board = []
        let id = 0;
        for (var col: number = 0; col < this.columns; col++) {
            board[col] = [];

            for (var row: number = 0; row < this.rows; row++) {
                board[col][row] = new Tile({
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
                    if (this.board[nx][ny].isMine) {
                        count++;
                        this.mines.add(this.board[nx][ny])
                    }
                }
                this.board[x][y].adjacentMines = count;
            }
        }
    }

    getUnrevealedCells(x: number, y: number, radius: number): Tile[] {
        const stack: [number, number][] = [[x, y]];
        const selectedTiles: Map<number, Tile> = new Map()

        while (stack.length > 0) {
            const [cx, cy] = stack.pop()!;
            const tile = this.board[cx][cy];

            const distance = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2))
            if (distance >= radius) continue

            const visibleType = tile.visibleType
            if (selectedTiles.has(tile.id) || visibleType != TileType.CLOSED && visibleType != TileType.PRESSED && visibleType != TileType.FLAG)
                continue;

            selectedTiles.set(tile.id, tile)

            if (tile.trueType == TileType.ZERO) {
                for (const [nx, ny] of this.getNeighbors(cx, cy)) {
                    const neighbor = this.board[nx][ny];
                    if (!neighbor.isRevealed && !neighbor.isMine) {
                        stack.push([nx, ny]);
                    }
                }
            }
        }

        return [...selectedTiles.values()]
    }
}
