export interface Tile {
    readonly id: number
    readonly row: number
    readonly column: number
    readonly type: TileType
    readonly isFlagged: boolean

    onClick(click: ClickParam): void
}

export enum TileType {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    MINE,
}

export class Mine implements Tile {
    readonly id: number
    readonly row: number
    readonly column: number
    readonly type: TileType = TileType.MINE
    isFlagged = false

    constructor(id: number, row: number, column: number) {
        this.id = id
        this.row = row
        this.column = column
    }

    onClick(): void {

    }
}

export enum ClickParam {
    LEFT,
    RIGHT
}

export class Number implements Tile {
    id: number
    row: number
    column: number
    type: TileType

    isFlagged = false

    constructor(id: number, row: number, column: number, type: TileType) {
        this.id = id
        this.row = row
        this.column = column
        this.type = type
    }

    onClick(click: ClickParam): void {
        if (click == ClickParam.RIGHT) {
            this.isFlagged = true;
        }
    }
}