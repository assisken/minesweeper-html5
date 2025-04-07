import { Image } from 'react-konva'
import { ClickParam, Tile as GameTile } from '../engine/tile'
import { Game } from '../engine/game'

import { KonvaEventObject } from 'konva/lib/Node'

type Props = {
    tile: GameTile
    isRevealed: boolean
    texture: CanvasImageSource
    game: Game
}

const width = 20
const height = 20

export function Tile(props: Props) {
    function useTap(e: KonvaEventObject<MouseEvent>) {
        const clickParam = e.evt.button == 2 ? ClickParam.RIGHT : ClickParam.LEFT
        props.game.onClick(props.tile, clickParam)
    }

    return (
        <Image
            x={props.tile.row * width}
            y={props.tile.column * height}
            width={width}
            height={height}
            image={props.texture}
            onMouseDown={useTap}
        />
    )
}
