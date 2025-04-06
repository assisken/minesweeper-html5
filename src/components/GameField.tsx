import { Engine } from '../engine/engine'
import { GeneralBox } from './Tile'
import { Fragment, ReactElement } from 'react'

const engine = new Engine(16, 30)

const boxes = new Map<number, ReactElement>()

export function GameField() {
  engine.render((tile) => {
    boxes.set(
      tile.id,
      <GeneralBox key={tile.id} x={tile.row} y={tile.column} texture={tile.texture} />
    )
  })

  return <Fragment>{Array.from(boxes.values())}</Fragment>
}
