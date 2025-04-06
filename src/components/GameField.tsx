import { Engine } from '../engine/engine'
import { Tile } from './Tile'
import { Fragment, ReactElement } from 'react'

const engine = new Engine(16, 30)

const boxes = new Map<number, ReactElement>()

export function GameField() {
  engine.render((tile) => {
    boxes.set(tile.id, <Tile key={tile.id} tile={tile} />)
  })

  return <Fragment>{Array.from(boxes.values())}</Fragment>
}
