import { Game } from "./game"

export enum TileType {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    PRESSED,
    FLAG,
    CLOSED,
    MINE,
    RED_MINE,
}

export enum ActionType {
    REVEAL,
    FLAG,
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

export class Tile {
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


    public get type(): TileType {
        if (this.isFlagged) {
            return TileType.FLAG
        }
        if (this.isPressed) {
            return TileType.PRESSED
        }
        if (!this.isRevealed) {
            return TileType.CLOSED
        }
        if (this.isMine) {
            return TileType.MINE
        }
        return this.adjacentMines
    }

    mineEvent() {
        if (!this.isMine) return

        console.log('game over')
    }

    trigger(action: ActionType, options: { chain: boolean }): void {
        if (!options.chain && !this.isRevealed && this.adjacentMines == 0 && action == ActionType.REVEAL) {
            this.game.triggerNeighbors(this, { actionType: action })
            return
        }

        if (!options.chain && this.isRevealed && action == ActionType.PRESS) {
            this.game.triggerNeighbors(this, { actionType: action, radius: 1 })
            return
        }
        if (!options.chain && this.isRevealed && action == ActionType.REVEAL) {
            this.game.triggerNeighbors(this, { actionType: action })
            return
        }
        if (this.isFlagged && (action == ActionType.REVEAL || action == ActionType.PRESS)) {
            return
        }

        switch (action) {
            case ActionType.FLAG:
                this.isFlagged = this.isFlagged ? false : true;
                this.isPressed = false
                return
            case ActionType.PRESS:
                this.isPressed = true
                return
        }

        this.isPressed = false
        this.isRevealed = true
    }
}
