import { Game } from "./game"

export interface Tile {
    readonly id: number
    readonly row: number
    readonly column: number
    readonly isFlagged: boolean

    isRevealed: boolean
    adjacentMines: number
    isMine: boolean

    readonly game: Game
    onTrigger(click: ClickParam): void
}

export enum ClickParam {
    LEFT,
    RIGHT
}

export type TileParams = {
    readonly id: number
    readonly row: number
    readonly column: number

    readonly isMine: boolean;
    readonly adjacentMines: number;

    isRevealed: boolean;
    isFlagged: boolean;
}

export class TileImpl implements Tile {
    readonly id: number
    readonly row: number
    readonly column: number
    readonly adjacentMines: number

    isRevealed: boolean
    isFlagged: boolean
    isMine: boolean

    readonly game: Game

    constructor(params: TileParams, game: Game) {
        this.id = params.id
        this.row = params.row
        this.column = params.column
        this.adjacentMines = params.adjacentMines
        this.isRevealed = params.isRevealed
        this.isFlagged = params.isFlagged
        this.isMine = params.isMine

        this.game = game
    }

    onTrigger(click: ClickParam): void {
        if (this.isRevealed) {
            return
        }

        if (click == ClickParam.RIGHT) {
            this.isFlagged = this.isFlagged ? false : true;
        }
        if (click == ClickParam.LEFT) {
            this.game.onTileTriggered(this.row, this.column)
        }
    }
}
