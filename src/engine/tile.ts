import { Game } from "./game"

export interface Tile {
    trigger(click: ClickParam): void
}

export enum ClickParam {
    LEFT,
    RIGHT,
    PRESS,
}

export type TileParams = {
    readonly id: number
    readonly row: number
    readonly column: number

    readonly isMine: boolean;

    adjacentMines: number;
    isRevealed: boolean;
    isFlagged: boolean;
}

export class TileImpl implements Tile {
    readonly id: number
    readonly row: number
    readonly column: number

    adjacentMines: number
    isRevealed: boolean
    isFlagged: boolean
    isMine: boolean
    isPressed: boolean = false

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

    mineEvent() {
        if (!this.isMine) return

        console.log('game over')
    }

    trigger(click: ClickParam): void {
        if (this.isRevealed && click == ClickParam.PRESS) {
            this.game.triggerNeighbors(this, (tile) => tile.trigger(click))
            return
        }
        if (this.isRevealed && click == ClickParam.LEFT) {
            this.game.triggerNeighbors(this, (tile) => tile.trigger(click))
            return
        }
        if (this.isFlagged && (click == ClickParam.LEFT || click == ClickParam.PRESS)) {
            return
        }

        switch (click) {
            case ClickParam.RIGHT:
                this.isFlagged = this.isFlagged ? false : true;
                this.isPressed = false
                this.game.onTileTriggered(this)
                return
            case ClickParam.PRESS:
                this.isPressed = true
                this.game.onTileTriggered(this)
                return
        }
        this.isPressed = false

        this.game.updateTile(this)
    }
}
