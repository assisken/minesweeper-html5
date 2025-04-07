import { Game } from '../engine/game'
import { Tile } from './Tile'
import { Fragment, ReactElement } from 'react'

const engine = new Game({
    rows: 30,
    columns: 16,
    totalMines: 99,
})

const boxes = new Map<number, ReactElement>()

export function GameField() {
    engine.onRender((tile) => {
        boxes.set(tile.id, <Tile key={tile.id} tile={tile} />)
    })

    return <Fragment>{Array.from(boxes.values())}</Fragment>
}
