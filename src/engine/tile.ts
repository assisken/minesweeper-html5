import mine from '../assets/svg/Minesweeper_unopened_square.svg'

export interface Tile {
    readonly id: number
    readonly row: number
    readonly column: number

    readonly texture: string
}

export class Mine implements Tile {
    readonly id: number
    readonly row: number
    readonly column: number
    readonly texture = mine

    constructor(id: number, row: number, column: number) {
        this.id = id
        this.row = row
        this.column = column
    }
}